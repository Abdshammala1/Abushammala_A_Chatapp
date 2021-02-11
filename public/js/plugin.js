import AppHeader from "./components/AppHeader.js";
import LoginModal from "./components/LoginModal.js";
import MessageBubble from "./components/MessageBubble.js";

const socket = io();

function connected({sID, message}) {
    vm.socketID = sID;
}

function user_disconnect(packet) {
    console.log(packet);
}

function scrollToEnd() {    	
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function push_message(msg) {
    vm.messages.push(msg);
    scrollToEnd();
}

const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        name: "",
        menu: {
            open: false
        },
        showLoginModal: true,
    },

    methods: {
        transmission_name(name) {
            socket.on('new_chat', {
                name: name 
            })
            this.name = name;
            this.showLoginModal = false;
        },

        transmission_message() {
            socket.emit('new_chat', {
                content: this.message,
                name: this.name
            })
            this.message = "";
        },
    },

    components: {
        AppHeader: AppHeader,
        newmessage: MessageBubble,
        loginmodal: LoginModal
    },

    mounted: function() {
        console.log('mounted');
    }
    
}).$mount("#app");

socket.addEventListener('connected', connected);
socket.addEventListener('user_disconnect', user_disconnect);
socket.addEventListener('broadcast_message', push_message);