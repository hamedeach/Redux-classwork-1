
class MyRedux {
    constructor(appinfo, reducer) {
        this.appinfo = appinfo
        this.state = [];
        this.listeners = [];
        this.reducer = reducer;
    }

    getState() {
        return this.state;
    }

    register(listenercallbackfunc) {
        this.listeners.push(listenercallbackfunc);
        console.log('new listener was registered !!');
        return () => {
            this.listeners.filter((l) => l !== listenercallbackfunc);
        }

    }

    dispatch(action) {
        console.log("dispatching...")
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((l) => l());

    }





}


// my app code



const addpost = "addpost";
const editpost = "editpost";

function generateID() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

const myStore = new MyRedux({
    app: {
        name: "Redux App ver 0.1",
        author: "Mohamed Hamed"
    }
}, reducerfunction);

console.log('Welcome to my Redux Application')
document.querySelector('h1').innerText = myStore.appinfo.app.name;
console.log(myStore.getState());
const unregisterAlert = myStore.register(() => {

    const commentslist = document.querySelector('ul');
    commentslist.innerHTML = '';
    myStore.getState().forEach((p) => {

        console.log("update UI after state changed !")
        const node = document.createElement('li');
        node.id = p.id;
        node.textContent = p.comment;

        commentslist.appendChild(node);


    });
})
//unregisterAlert();

myStore.register(()=>{
    document.querySelector("textarea").value='';
});

// sample of action creator 
const addPost_Action = (post) => {
    return {
        type: addpost,
        post,

    }
}

const editPost_Action = (post) => {
    type: editpost,
        post
}


//reducer function to update the state
function reducerfunction(state = [], action) {
    switch (action.type) {
        case addpost:
            console.log("adding a post...");
            console.log(action.post);
            return state.concat(action.post);
        case editpost:
            return null;//state.map((p)=>{(p.id !==action.post.id)?p:null})
        default: return state;
    }

}

myStore.dispatch(addPost_Action(
    {
        id: generateID(),
        comment: "Hello its my first post on balady facebook",
    }));


    const postbtn =document.querySelector('button');
    postbtn.onclick=()=>{
        const txtarea = document.querySelector('textarea');
        (txtarea.value==='')? alert('can not post empty post!'):
        myStore.dispatch(addPost_Action(
            {
                id: generateID(),
                comment: txtarea.value,
            }));
    }