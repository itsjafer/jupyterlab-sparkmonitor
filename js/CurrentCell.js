import { PromiseDelegate } from '@phosphor/coreutils';

// Logic adapted from https://github.com/deshaw/jupyterlab-execute-time/blob/master/src/ExecuteTimeWidget.ts

export default class CurrentCell {
    constructor(panel) {
        this.isReady = new PromiseDelegate();
        this._cellSlotMap = {};
        this._panel = panel;
        this.activeCell = null;
        this.lastExecutedCell = null;
        this.cellReexecuted = null;
        this.numCellsExecuted = 0;
        this.lastBusySignal = ''; // because the signal is emitted 3 times for every execution. Only want to increment by 1
        this.updateConnectedCell = this.updateConnectedCell.bind(this);
        this.init();
    }

    async init() {
        await this._panel.revealed;
        this.notebook = this._panel.content;
        this._registerCells();
        this.isReady.resolve(undefined);
    }

    updateConnectedCell(
        cells,
        changed
    ) {
        // While we could look at changed.type, it's easier to just remove all
        // oldValues and add back all new values
        changed.oldValues.forEach(this._deregisterMetadataChanges.bind(this));
        changed.newValues.forEach(this._registerMetadataChanges.bind(this));
    }

    _registerMetadataChanges(cellModel) {
        if (!(cellModel.id in this._cellSlotMap)) {
            const fn = () => this._cellMetadataChanged(cellModel);
            this._cellSlotMap[cellModel.id] = fn;
            cellModel.metadata.changed.connect(fn);
            // In case there was already metadata (do not highlight on first load)
            this._cellMetadataChanged(cellModel, true);
        }
    }


    _deregisterMetadataChanges(cellModel) {
        const fn = this._cellSlotMap[cellModel.id];
        if (fn) {
            cellModel.metadata.changed.disconnect(fn);
            const codeCell = this._getCodeCell(cellModel);
        }
        delete this._cellSlotMap[cellModel.id];
    }

    /**
     * Return a codeCell for this model if there is one. This will return null
     * in cases of non-code cells.
     *
     * @param cellModel
     * @private
     */
    _getCodeCell(cellModel) {
        if (cellModel.type === 'code') {
            const cell = this._panel.content.widgets.find(
                (widget) => widget.model === cellModel
            );
            return cell;
        }
        return null;
    }


    _cellMetadataChanged(cellModel, disableHighlight = false) {
        console.log('Cell metadata changed')
        const codeCell = this._getCodeCell(cellModel);
        if (codeCell) {
            const executionMetadata = codeCell.model.metadata.get(
                'execution'
            );
            if (executionMetadata) {
                // const startTimeStr = (executionMetadata['shell.execute_reply.started'] ||
                //     executionMetadata['iopub.execute_input']) as string | null;

                if ((executionMetadata['iopub.status.busy']) && this.lastBusySignal != executionMetadata['iopub.status.busy']) {
                    console.log('we have an active cell!')
                    this.activeCell = codeCell;
                    this.cellReexecuted = (this.lastExecutedCell == codeCell);
                    this.lastExecutedCell = codeCell;
                    this.numCellsExecuted += 1;
                    this.lastBusySignal = executionMetadata['iopub.status.busy']
                }
            }
        }
    }

    _registerCells() {
        const cells = this._panel.context.model.cells;
        console.log('connecting cells')
        cells.changed.connect(this.updateConnectedCell);
        for (let i = 0; i < cells.length; ++i) {
            this._registerMetadataChanges(cells.get(i));
        }
    }

    getActiveCell() {
        return this.activeCell;
    }

    getCellReexecuted() {
        return this.cellReexecuted;
    }
    getNumCellsExecuted() {
        return this.numCellsExecuted;
    }
    ready() {
        return this.isReady.promise;
    }
}
