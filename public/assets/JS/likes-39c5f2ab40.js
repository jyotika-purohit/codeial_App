let post_like_btn=$(".post-likes a");post_like_btn.on("click",(function(t){let l=$(this).parent(),n=$(l).children("span"),e=$(n).html();e++,$(n).html(e)}));