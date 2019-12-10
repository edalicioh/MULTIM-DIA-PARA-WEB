import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

const load = Vue.component('load', {
    template:`
    <div class="box-load">
        <svg>
            <circle
                cx="70"
                cy="70"
                r="70"
            >
            </circle>
        </svg>
    </div>
    `,
})


export default load