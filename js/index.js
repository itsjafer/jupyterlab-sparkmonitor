/**
 * Entrypoint module for the SparkMonitor frontend extension.
 *
 * @module module
 */
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import { INotebookTracker } from '@jupyterlab/notebook';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { Menu } from '@phosphor/widgets';
import SparkMonitor from './SparkMonitor';

/** Entrypoint: Called when the extension is loaded by jupyter. */
const extension = {
    id: 'jupyterlab_sparkmonitor',
    autoStart: true,
    requires: [INotebookTracker, IMainMenu],
    activate(app, notebooks, mainMenu) {
        let monitor;
        console.log('JupyterLab SparkMonitor is activated!');
        notebooks.widgetAdded.connect((sender, nbPanel) => {
            console.log('Notebook added!');
            const { session } = nbPanel;
            session.ready.then(() => {
                console.log('Notebook session ready');
                const { kernel } = session;
                kernel.ready.then(() => {
                    if (kernel.info.language_info.name === 'python') {
                        monitor = new SparkMonitor(nbPanel);
                        console.log('Notebook kernel ready');
                        monitor.startComm(kernel);
                    }
                });
            });
        });

        const commandID = 'toggle-monitor';
        let toggled = false;

        app.commands.addCommand(commandID, {
            label: 'Disable Monitors',
            isEnabled: () => true,
            isVisible: () => true,
            isToggled: () => toggled,
            execute: () => {
                console.log(`Executed ${commandID}`);
                toggled = !toggled;
                monitor.toggleAll();
            },
        });

        const menu = new Menu({ commands: app.commands });
        menu.title.label = 'SparkMonitor';
        menu.addItem({
            command: commandID,
            args: {},
        });

        mainMenu.addMenu(menu, { rank: 40 });
    },
};

export default extension;
