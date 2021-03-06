const Post=require('../models/post');
const User= require('../models/user');

module.exports.home=async function(req,res){
    try{
        let all_posts=await Post.find({})
        .sort('-createdAt')
        .populate('user','name')
        .populate({
            path:'comments',
            populate:([{    //populating user and likes of comment so ([{path1},{path2}]) 
                path:'user'
            },
            {
                path:'likes',
                    populate:{
                        path:'user'
                    }
            }])
        })
        .populate({
            path:'likes',
            populate:{
                path:'user'
            }
        }); 

        let all_users=await User.find({})
        .populate({
            path:'friendships'
        })
        .select('name email');

        return res.render('home',{
            title:"Home | Codeial",
            all_posts:all_posts,
            all_users:all_users
        });
        
    }catch(error){
        req.flash('error',error);
        return res.redirect('back');
    }
}