import Post from "../models/post"


export const home = (req, res) => res.render("home", { pageTitle: "Home" });


export const post = async(req, res) => {
    const posts = await Post.find({}).sort({ createdAt: "asc" });
    console.log(post);    
    return res.render("post", { pageTitle: "Post", posts});
};



export const watch = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post){
        return res.render("404", {pageTitle: "Post not found"});
    }
    return res.render("watch", {pageTitle: post.title, post });
};


export const getEdit = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post){
        return res.render("404", {pageTitle: "Post not found"});
    }
    return res.render("edit", { pageTitle: `Edit: ${post.title}`, post});
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {prefix, title, content} = req.body;
    const post = await Post.findById(id);
    if (!post){
        return res.render("404", {pageTitle: "Post not found"});
    }
    await Post.findByIdAndUpdate(id, {
        prefix,
        title,
        content
    })
    return res.redirect(`/post/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Post"});
};

export const postUpload = async (req, res) => {
    const { title, prefix,content } = req.body;
    try{
        await Post.create({
            prefix: prefix,
            title: title,
            writer: 1,
            content: content,
        });
    return res.redirect("/post");
    } catch(error){
        return res.render("upload", {pageTitle: "Upload Post", errorMessage: error._message,});
    }

};


export const deletePost = async(req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    return res.redirect("/post");
};


export const search = async (req, res) => {
    const { keyword } = req.query;
    let posts = [];
    if (keyword) {
        // $regex 연산자에 변수를 올바르게 전달
        posts = await Post.find({
            title: {
                $regex: new RegExp(keyword, "i")
            }
        });
    }
    return res.render("search", { pageTitle: "Search", posts });
};



