document.addEventListener("DOMContentLoaded", function () {
    const subscribeButton = document.querySelector(".button[onclick='subscribe()']");
    let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
    let userSubscribed = localStorage.getItem("userSubscribed") === "true";
  
    function subscribe() {
      if (userSubscribed) {
        alert("You are already subscribed!");
        return;
      }
      
      let email = prompt("Enter your email to subscribe:");
      if (email && !subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        localStorage.setItem("userSubscribed", "true");
        if (subscribeButton) {
          subscribeButton.innerText = "Subscribed";
          subscribeButton.disabled = true;
        }
        alert("You have successfully subscribed! You'll get notified when new content is added.");
      } else {
        alert("You are already subscribed or entered an invalid email.");
      }
    }
  
    function notifySubscribers(content) {
      if (subscribers.length > 0) {
        alert(`New content uploaded: ${content}. Subscribers have been notified!`);
      }
    }
  
    if (userSubscribed && subscribeButton) {
      subscribeButton.innerText = "Subscribed";
      subscribeButton.disabled = true;
    }
  
    window.subscribe = subscribe;
    window.notifySubscribers = notifySubscribers;
  
    // Kazi ya Like Button
    function likePost() {
        let likeElement = document.getElementById('likes');
        let currentLikes = localStorage.getItem('likes');
  
        if (currentLikes === null) {
          currentLikes = 60;
        } else {
          currentLikes = parseInt(currentLikes);
        }
  
        currentLikes++;
        if (likeElement) likeElement.innerText = currentLikes + 'k';
  
        localStorage.setItem('likes', currentLikes);
      }
  
      // Kazi ya Comment Button
      function commentPost() {
        let commentBox = document.getElementById('comment-box');
        let submitButton = document.getElementById('submit-comment');
  
        if (commentBox) commentBox.style.display = 'block';
        if (submitButton) submitButton.style.display = 'block';
      }
  
      function submitComment() {
        let commentBox = document.getElementById('comment-text');
        let comment = commentBox ? commentBox.value : "";
  
        if (comment.trim() === "") {
          alert("Please write a comment!");
          return;
        }
  
        let commentsList = localStorage.getItem('commentsList');
        if (commentsList === null) {
          commentsList = [];
        } else {
          commentsList = JSON.parse(commentsList);
        }
  
        commentsList.push(comment);
        localStorage.setItem('commentsList', JSON.stringify(commentsList));
  
        let commentsCount = commentsList.length;
        let commentElement = document.getElementById('comments');
        if (commentElement) commentElement.innerText = commentsCount + 'k';
  
        if (commentBox) commentBox.value = '';
        if (document.getElementById('comment-box')) document.getElementById('comment-box').style.display = 'none';
        if (document.getElementById('submit-comment')) document.getElementById('submit-comment').style.display = 'none';
  
        sendToWhatsApp(comment);
      }
  
      function sendToWhatsApp(comment) {
        console.log("Sending comment to WhatsApp silently: " + comment);
      }
  
      // Kazi ya Share Post
  function sharePost() {
    let shareText = "Check out this amazing content!";
    let shareUrl = window.location.href;

    // Pata idadi ya shares kutoka localStorage
    let shareCount = localStorage.getItem('shareCount');
    if (shareCount === null) {
      shareCount = 0;  // Ikiwa hakuna idadi ya shares, anza na 0
    } else {
      shareCount = parseInt(shareCount);  // Pata idadi ya shares kama namba
    }

    // Ongeza 1 kwa idadi ya shares
    shareCount++;

    // Hifadhi idadi mpya ya shares kwenye localStorage
    localStorage.setItem('shareCount', shareCount);

    // Fungua WhatsApp na ujumbe wa kushare
    let whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');

    // Sasisha idadi ya shares kwenye ukurasa
    let shareElement = document.getElementById('shares');
    if (shareElement) {
      shareElement.innerText = shareCount + 'k';  // Onyesha idadi ya shares kwenye ukurasa
    }
  }

  // Load saved data from localStorage wakati wa kupakia ukurasa
  let likeElement = document.getElementById('likes');
  let commentElement = document.getElementById('comments');
  let shareElement = document.getElementById('shares');

  let savedLikes = localStorage.getItem('likes');
  if (savedLikes !== null && likeElement) {
    likeElement.innerText = savedLikes + 'k';
  }

  let commentsList = localStorage.getItem('commentsList');
  if (commentsList !== null && commentElement) {
    commentsList = JSON.parse(commentsList);
    let commentsCount = commentsList.length;
    commentElement.innerText = commentsCount + 'k';
  }

  let savedShareCount = localStorage.getItem('shareCount');
  if (savedShareCount !== null && shareElement) {
    shareElement.innerText = savedShareCount + 'k';
  }

  // Fungua kazi za subscribe, like, comment, submit comment na share kwenye window
  window.subscribe = subscribe;
  window.likePost = likePost;
  window.commentPost = commentPost;
  window.submitComment = submitComment;
  window.sharePost = sharePost;
});