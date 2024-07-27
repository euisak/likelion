
import Post from "../models/post";

export const home = async (req, res) => {
  try {
    // 상위 5개의 게시글을 조회합니다.
    const top5Posts = await Post.find({})
      .sort({ 'meta.like': -1 }) // 좋아요 수를 기준으로 내림차순 정렬
      .limit(5)
      .exec();

    // 홈 페이지를 렌더링합니다.
    return res.render("home", {
      pageTitle: "Home",
      top5Contents: top5Posts
    });
  } catch (error) {
    console.error("Error fetching top 5 posts:", error);
    return res.render("home", {
      pageTitle: "Home",
      top5Contents: []
    });
  }
};


export const post = async(req, res) => {
    const posts = await Post.find({}).sort({ createdAt: "asc" });
    console.log(posts);    
    return res.render("post", { pageTitle: "Post", posts});
};



export const watch = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post){
        return res.render("404", {pageTitle: "Post not found"});
    }
    post.meta.views += 1;
    await post.save();


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


export const increaseLike = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.meta.like += 1;
    await post.save();

    return res.status(200).json({ likeCount: post.meta.like });
};


