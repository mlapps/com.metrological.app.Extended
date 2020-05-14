import {Lightning, Utils} from 'wpe-lightning-sdk';
import RoundRectangleShader from '../shader/RoundRectangleShader.js';

export default class AssetItem extends Lightning.Component {
    static _template() {
        const trans = {duration: 0.5, timingFunction: 'linear'};
        return {
            w: 310, h: 300, clipping: true,color: 0xff090909,
            flexItem: {marginRight: 30},
            Thumb: {
                transitions: {
                    colorTop: trans,
                    colorBottom: trans,
                    colorLeft: trans,
                    colorRight: trans
                }
            },
            Cube: {alpha: 0, mount: 1, x: 295, y: 285, w: 50, h: 50, rect: true,
                shader: {
                    type: RoundRectangleShader,
                    radius: 25
                }
            }
        }
    }

    set item(obj) {
        this._item = obj;
        this._update();
    }

    _update() {
        if(this.active && this._item) {
            const {thumb = 'one', colors = {}} = this._item;
            this.patch({
                Thumb: {...colors, src: Utils.asset(`images/thumbs/${thumb}.jpg`)},
                Cube: {...colors}
            });
        }
    }

    _firstActive() {
        this._update();
    }

    _focus() {
        const copy = {...this._item.colors};
        Object.keys(copy).forEach((key) => {
            copy[key] = 0xffffffff;
        });

        this.patch({
            Thumb: {smooth: {...copy}},
            Cube: {smooth: {alpha: 1}}
        });
    }

    _unfocus() {
        this.patch({
            Thumb: {smooth: {...this._item.colors}},
            Cube: {smooth: {alpha: 0}}
        });
    }
}

export class AssetItemDIY extends AssetItem {
    static get width() {
        return 310;
    }

    static get height() {
        return 300;
    }
}