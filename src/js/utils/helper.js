
import uuid from 'uuid';
import { asYouType } from 'libphonenumber-js';

const helper = {
    pad(number) {
        return ('0' + number).slice(-2);
    },

    getTime(duration) {
        var minutes = Math.floor(duration / 1000 / 60);
        var second = Math.floor(duration / 1000 - minutes * 60);

        return `${this.pad(minutes)}:${this.pad(second)}`;
    },

    getPallet(image) {
        return new Promise((resolve, reject) => {
            image = image.replace(/\?.*$/, '') + '?param=20y20';

            new window.AlbumColors(image).getColors((colors, err) => {
                if (err) {
                    resolve([
                        [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0],
                    ]);
                } else {
                    resolve(colors);
                }
            });
        });
    },

    formatPhone(phone) {
        if (!phone.startsWith('+86')
            && /1[34578][012356789]\d{8}|134[012345678]\d{7}/.test(phone)) {
            return {
                code: '86',
                phone,
            };
        }

        var formatter = new asYouType();
        formatter.input(phone);
        return {
            code: formatter.country_phone_code,
            phone: formatter.national_number,
        };
    },

    pureColor(colors = []) {
        var rgb = colors[1] || [255, 255, 255];

        return `
            rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.random()})
        `;
    },

    genColor(colors = []) {
        var r = colors[0] || [255, 255, 255];
        var b = colors[1] || [255, 255, 255];
        var g = colors[2] || [255, 255, 255];

        return `
            linear-gradient(${Math.random() * 100}deg,
                rgba(${r[0]}, ${r[1]}, ${r[2]}, ${Math.random()}) ${Math.random() * 33}%,
                rgba(${g[0]}, ${g[1]}, ${g[2]}, ${Math.random()}) ${Math.random() * 66}%,
                rgba(${b[0]}, ${b[1]}, ${b[2]}, ${Math.random()}) 100%
            )
        `;
    },

    randomName(prefix = 'animation') {
        return `${prefix}-${uuid.v4()}`;
    },

    formatNumber(number = 0) {
        return number.toString().split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev;
        });
    },

    humanNumber(number) {
        if (number > 1000 * 1000) {
            return (number / 1000 / 1000).toFixed(2) + 'M';
        }

        if (number > 1000) {
            return (number / 1000).toFixed(2) + 'K';
        }

        return number;
    }
};

export default helper;
