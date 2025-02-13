function displayRandomDailymotionVideo(countryCode) {
        var videoIds = {
            "US": {
                "x98t75k": "https://www.facebook.com/howtodo.videos",
                "x98t6nk": "https://www.facebook.com/howtodo.videos"
            },
            "BD": {
                "x98t6nk": "https://www.facebook.com/howtodo.videos",
                "x98tq20": "https://www.facebook.com/howtodo.videos"
            },
            "default": {
                "x98t6g4": "https://www.facebook.com/howtodo.videos",
                "x98to7u": "https://www.facebook.com/howtodo.videos"
            }
        };

        var keywords = {
            "x98tq20": ["hand bags", "hand bag", "best hand bag"], 
            "x98to7u": ["earphone", "earphones", "best earphone"], 
            "x98t75k": ["Luggage", "luggage", "best luggage"], 
            "x98t6nk": ["Jacket", "jacket", "best jacket"], 
            "x98t6g4": ["shirts", "shirt", "best shirts"]
        };
      
      
      
      

        var countryVideoIds = videoIds[countryCode] || videoIds["default"];
        var selectedVideoIds = [];
        var maxCount = 0;

        var pageContent = document.body.innerText.toLowerCase();
        var keywordCounts = {};

        for (var videoId in countryVideoIds) {
            if (keywords[videoId]) {
                keywordCounts[videoId] = 0;
                keywords[videoId].forEach(function (keyword) {
                    if (pageContent.includes(keyword.toLowerCase())) {
                        keywordCounts[videoId]++;
                    }
                });
            }
        }

        for (var videoId in keywordCounts) {
            if (keywordCounts[videoId] > maxCount) {
                maxCount = keywordCounts[videoId];
                selectedVideoIds = [videoId];
            } else if (keywordCounts[videoId] === maxCount) {
                selectedVideoIds.push(videoId);
            }
        }

        if (maxCount === 0 || selectedVideoIds.length === 0) {
            var randomIndex = Math.floor(Math.random() * Object.keys(countryVideoIds).length);
            selectedVideoIds = [Object.keys(countryVideoIds)[randomIndex]];
        } else {
            shuffleArray(selectedVideoIds);
        }

        var selectedVideoId = selectedVideoIds[0];

        var embedUrl = "https://www.dailymotion.com/embed/video/" + selectedVideoId + "?autoplay=1&mute=1";

        var videoElementHTML = `
            <div id="video-wrapper" style="display: flex; justify-content: center; padding: 26px 15px 46px 15px; background-color: #f0f1f1; border-radius: 4px; margin: 3px 0 4px 0;">
                <a href="https://www.adscroller.com/" target="_blank" rel="nofollow">
                    <img src="https://pub.scroller.link/image/adscroller-shopping-offer.png" style="width: 100px; margin-bottom: 4px; margin-top: -16px; position: absolute;">
                </a>
                <iframe id="video-iframe" width="338" height="190" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <style>
                @media only screen and (max-width: 600px) {
                    #video-iframe {
                        height: 175px;
                    }
                }
            </style>
        `;

        var paragraphs = document.getElementsByTagName("p");
        if (paragraphs.length >= 4) {
            var fourthParagraph = paragraphs[3];
            var lastParagraph = paragraphs[paragraphs.length - 1];

            var videoElementAfterFourth = document.createElement("div");
            videoElementAfterFourth.innerHTML = videoElementHTML;
            fourthParagraph.parentNode.insertBefore(videoElementAfterFourth, fourthParagraph.nextSibling);

            var videoElementAfterLast = document.createElement("div");
            videoElementAfterLast.innerHTML = videoElementHTML;
            lastParagraph.parentNode.insertBefore(videoElementAfterLast, lastParagraph.nextSibling);

            addPlayButton(videoElementAfterFourth, countryVideoIds, selectedVideoId);
            addPlayButton(videoElementAfterLast, countryVideoIds, selectedVideoId);
        }
    }

    function addPlayButton(videoElement, countryVideoIds, selectedVideoId) {
        var playButton = document.createElement("button");
        playButton.id = "play-button";
        playButton.textContent = "Play Video";
        playButton.addEventListener("click", function () {
            playButton.style.display = "none";

            var videoIframe = videoElement.querySelector("#video-iframe");
            videoIframe.src += "&autoplay=1";
});
      
       videoElement.appendChild(playButton);

    var buttonContainer = document.createElement("div");
    buttonContainer.style.textAlign = "center";
    buttonContainer.style.marginTop = "10px";
    buttonContainer.style.marginBottom = "30px";
    videoElement.appendChild(buttonContainer);

    for (var videoId in countryVideoIds) {
        if (videoId === selectedVideoId) {
            var button = document.createElement("button");
            button.textContent = "Visit Link";
            button.className = "promotional-button";
            button.style.backgroundColor = "#007bff";
            button.style.cursor = "pointer";
            button.style.border = "none";
            button.style.padding = "8px";
            button.style.color = "#fff";
            button.style.position = "absolute";
            button.style.marginLeft = "-35px";
            button.style.marginTop = "-51px";
            button.style.marginBottom = "10px";
            button.addEventListener("click", function (url) {
                return function () {
                    openUrl(url);
                };
            }(countryVideoIds[videoId]));
            buttonContainer.appendChild(button);
        }
    }

    playButton.click();
}

function openUrl(url) {
    window.open(url, "_blank");
}

function displayContentBasedOnCountry(countryCode) {
    var contentElement = document.getElementById("content-" + countryCode.toLowerCase());
    if (!contentElement) {
        contentElement = document.getElementById("content-default");
    }
    if (contentElement) {
        contentElement.style.display = "block";
    }

    displayRandomDailymotionVideo(countryCode);
}

function loadDailymotionVideo() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            fetch(`https://ipapi.co/${ipAddress}/country_code/`)
                .then(response => response.text())
                .then(countryCode => {
                    displayContentBasedOnCountry(countryCode);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadDailymotionVideo();

function hideDailymotionContent() {
  var dailymotionEmbeds = document.querySelectorAll("iframe[src*='dailymotion.com'], embed[src*='dailymotion.com'], object[data*='dailymotion.com']");
  var promotionalButtons = document.querySelectorAll(".promotional-button");
  var videoWrappers = document.querySelectorAll("#video-wrapper");

  var img = new Image();
  img.onload = function () {
    console.log("Dailymotion server is reachable.");
  };
  img.onerror = function () {
    dailymotionEmbeds.forEach(function (embed) {
      embed.style.display = "none";
    });
    promotionalButtons.forEach(function (button) {
      button.style.display = "none";
    });
    videoWrappers.forEach(function (wrapper) {
      wrapper.style.display = "none";
    });
  };
  img.src = "https://www.dailymotion.com/favicon.ico";
}
window.onload = function () {
  hideDailymotionContent();
};