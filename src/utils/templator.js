import get from 'lodash/get';

const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

function _compileTemplate(tmpl, ctx) {
    let key = null;
    let html = tmpl;

    while ((key = TEMPLATE_REGEXP.exec(tmpl))) {

		if (key[1]) {
            const data = get(ctx, key[1].trim());

            if (typeof data === 'function') {
                window[key[1].trim()] = data;
                html = html.replace(
                    new RegExp(key[0], 'gi'),
                    `window.${key[1].trim()}()`,
                );
                continue;
            }

            html = html.replace(new RegExp(key[0], 'gi'), data);
		}
    }

    return html;
}

export function compile(template, ctx) {
    return _compileTemplate(template, ctx);
}
