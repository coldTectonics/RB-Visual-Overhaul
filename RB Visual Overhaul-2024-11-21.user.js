// ==UserScript==
// @name         RB Visual Overhaul
// @namespace    http://tampermonkey.net/
// @version      2024-11-21
// @description  replaces old rank icons and adds new ones, brings back the clock, etc.
// @author       Lemniscata
// @match        https://www.rusbionicle.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rusbionicle.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // часы
    var clock = document.createElement('div');
    clock.innerHTML = '<div id="clock"> \
      <center><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="140" height="140"> \
	<param name="movie" value="http://www.rusbionicle.com/clock/clockfinal2.swf" /> \
	<param name="quality" value="high" /> \
	<embed src="http://www.rusbionicle.com/clock/clockfinal2.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="140" height="140"></embed> \
	</object> \
	</center> \
    </div>';
    document.getElementById('datebar').appendChild(clock);

    // логика рангов в разработке, будет тут

    // реплейс существующих иконок рангов
    function updateImagesSrc() {
		document.querySelectorAll('img[src*="./images/ranks/"]').forEach((previewImage) => {
			//console.info('rb - swap img.src; image:', previewImage);
            //console.log(typeof previewImage.src)
			previewImage.src = previewImage.src.toLowerCase().replace('https://www.rusbionicle.com/forumsbio/images/ranks/', 'https://brickshelf.com/gallery/Roodaka8761/Bionicle/RB-new-ranks/');
		})

	}

	if(document.readyState == 'complete') {
    updateImagesSrc();
} else {
    window.addEventListener('load', updateImagesSrc);
}
})();