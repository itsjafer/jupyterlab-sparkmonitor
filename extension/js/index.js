/**
 * Entrypoint module for the SparkMonitor frontend extension.
 *
 * @module module
 */
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import { INotebookTracker } from '@jupyterlab/notebook';
import SparkMonitor from './SparkMonitor';

/** Entrypoint: Called when the extension is loaded by jupyter. */
const extension = {
    id: 'jupyterlab_sparkmonitor',
    autoStart: true,
    requires: [INotebookTracker],
    activate(app, notebooks) {
        console.log('JupyterLab SparkMonitor is activated!');
        notebooks.widgetAdded.connect((sender, nbPanel) => {
            console.log('Notebook added!');
            const { session } = nbPanel;
            session.ready.then(() => {
                console.log('Notebook session ready');
                const { kernel } = session;
                kernel.ready.then(() => {
                    if (kernel.info.language_info.name === 'python') {
                        const monitor = new SparkMonitor(nbPanel);
                        console.log('Notebook kernel ready');
                        monitor.startComm(kernel);
                    }
                });
            });
        });
    },
};

export default extension;
