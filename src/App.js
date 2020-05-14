/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 RDK Management
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Lightning, Utils} from 'wpe-lightning-sdk';

import {ListDIY as List, AssetItemDIY as AssetItem, MenuItemDIY as MenuItem} from './components';

export default class App extends Lightning.Component {
    static getFonts() {
        return [{family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf')}];
    }

    static _template() {
        return {
            Menu: {x: 120, y: 90, type: List, spacing: 30},
            Assets: {x: 120, y: 650, type: List, orientation: 'horizontal', spacing: 30},
            Content: {x: 590,  y: 90, w: 1200, h: 470, rect: true, color: 0xff090909,
                Label: {
                    x: 600, y: 235, color: 0xffc0392b, mountX: 0.5, mountY: 0.4, text: {text: 'HOME', fontSize: 150}
                }
            }
        };
    }

    _init() {
        this.tag('Menu').items = [
            {type: MenuItem, item: {label: 'Home', displayColor: 0xffc0392b}},
            {type: MenuItem, item: {label: 'Pictures', displayColor: 0xff27ae60}},
            {type: MenuItem, item: {label: 'Videos', displayColor: 0xff8e44ad}},
            {type: MenuItem, item: {label: 'Network', displayColor: 0xfff39c12}},
            {type: MenuItem, item: {label: 'Settings', displayColor: 0xff3498db}},
        ];

        this._setState('Menu');
    }

    $changeContent({label, displayColor}) {
        this.tag("Label").patch({
            text: {text: label.toUpperCase()}, color: displayColor
        });
    }

    static _states() {
        return [
            class Menu extends this {
                _getFocused() {
                    return this.tag('Menu');
                }
                _handleDown() {
                    this._setState('Assets');
                }
            },
            class Assets extends this {
                $exit() {
                    this.tag('Assets').setIndex(0);
                }
                _getFocused() {
                    return this.tag('Assets');
                }
                _handleUp() {
                    this._setState('Menu');
                }
            }
        ]
    }

    _firstActive() {
        this.tag('Assets').items = [
            {type: AssetItem, item: {thumb: 'one', colors: {colorBottom: 0xff93e0fa, colorTop: 0xfffcc214}}},
            {type: AssetItem, item: {thumb: 'two', colors: {colorBottom: 0xfffcc214, colorTop: 0xff321e78}}},
            {type: AssetItem, item: {thumb: 'three', colors: {colorBottom: 0xffd69c09, colorTop: 0xffb03302}}},
            {type: AssetItem, item: {thumb: 'four', colors: {colorBottom: 0xff822c0a, colorTop: 0xffbbfafc}}},
            {type: AssetItem, item: {thumb: 'five', colors: {colorLeft: 0xfff2fab6, colorRight: 0xff042066}}}
        ];
    }
}


