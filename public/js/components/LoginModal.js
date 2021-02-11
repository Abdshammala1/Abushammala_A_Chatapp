export default {
    props: ['name'],
    template: `
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                                
                    <form class="name-form">
                        <span v-on:click="$emit('close-name')">X</span>
                        <label for="name">Enter your name: </label>
                        <input v-model="new_name" name="name" placeholder="e.g. Lakers">
                        <input @click.prevent="$emit('dispatch-name', new_name)" id="name-submit" type="submit" value="Start">
                    </form>
                </div>
            </div>
        </div>
    </transition>
    `,
    
    data: function() {
        return {
            new_name: name
        }
    },
    
    methods: {
    }
}
