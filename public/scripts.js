console.log(io());

const socket = io({
    auth: {
        token: "abcd"
    },
    query: {
        x: 42
    }
});


socket.on('welcome',(data)=>{
    console.log(data);

    socket.emit("thankyou",[4,5,6])

    
})

socket.on('newclient',(data)=>{
    console.log(data);
})

socket.on('messageFromServerToAllClients',newMessage=>{
    document.getElementById('messages').innerHTML += `<li>${newMessage}</li>`
})

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("messages-form");
    console.log(form);

    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        const newMessage = document.getElementById('user-message').value
        console.log(newMessage);
        document.getElementById('user-message').value = ""
        // this socket is sending an event to the server...
        socket.emit('messageFromClientToServer',newMessage)
    })

    

})