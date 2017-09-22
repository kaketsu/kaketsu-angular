import {Component, Input} from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'gr-affix',
    templateUrl: 'affix.container.html',
    styleUrls: ['affix.container.scss']
})

export class GrAffix {
    private _navs: any;

    @Input()
    get navs() {
        return this._navs;
    }
    set navs(data) {
        this._navs = data;
    }
}
