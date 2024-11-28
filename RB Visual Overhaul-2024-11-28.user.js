// ==UserScript==
// @name         RB Visual Overhaul
// @namespace    http://tampermonkey.net/
// @version      2024-11-25
// @description  replaces old rank icons and adds new ones, brings back the clock, etc.
// @author       Lemniscata
// @match        https://www.rusbionicle.com/*
// @match        https://rusbionicle.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rusbionicle.com
// @resource     DEFAULT_CSS https://rusbionicle.com/forumsbio/style.php?&id=8&lang=ru
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/coldTectonics/RB-Visual-Overhaul/refs/heads/main/dark_theme/cssoverride.css
// @resource     DATABASE https://raw.githubusercontent.com/OSP-Scata/RB-Visual-Overhaul/refs/heads/main/new_ranks/ranks-database.json
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @license      MIT
// ==/UserScript==

// Функция для замены одной строки в HTML на другую
function replaceHtmlString(oldString, newString) {
    // Получаем весь HTML-документ как строку
    const htmlContent = document.body.innerHTML;

    // Заменяем все вхождения старой строки на новую
    const updatedHtmlContent = htmlContent.replace(new RegExp(oldString, 'g'), newString);

    // Обновляем HTML-документ
    document.body.innerHTML = updatedHtmlContent;
}


(async() => {
    'use strict';
    // часы
    var clock = document.createElement('div');
    clock.innerHTML = '<div id="clock"> \
    <center><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="150" height="150"> \
    <param name="wmode" value="transparent" /> \
	<param name="movie" value="/clock/clockfinal2.swf" /> \
	<param name="quality" value="high" /> \
	<embed src="/clock/clockfinal2.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="150" height="150" wmode="transparent"></embed> \
	</object> \
	</center> \
    </div>';
    document.getElementById('datebar').appendChild(clock);

    // тёмная тема и кнопка для переключения
    const darkTheme = GM_getResourceText("IMPORTED_CSS");
    const lightTheme = GM_getResourceText("DEFAULT_CSS");
    var button = document.createElement("button");
    var header = document.querySelector('#logodesc');
    header.appendChild(button);
    var currentTheme = await GM_getValue("theme");
    var state;
    button.addEventListener('click', toggle);
    if (currentTheme == 'light' || typeof currentTheme == 'undefined') {
        button.innerText = "Тёмная тема";
        state = false;
        button.style.cssText = 'float: right; margin: 20px; background-color: #383a40; color: #dbdee1';
    }
    else if (currentTheme == 'dark') {
        GM_addStyle(darkTheme);
        state = true;
        button.innerText = "Светлая тема";
        button.style.cssText = 'float: right; margin: 20px; background-color: unset; color: unset';
    }
    function toggle(){
        if (!state) {
            GM_addStyle(darkTheme);
            button.innerText = "Светлая тема";
            button.style.cssText = 'float: right; margin: 20px; background-color: unset; color: unset';
            state = true;
            GM_setValue("theme", "dark");
        }
        else {
            GM_addStyle(lightTheme);
            button.innerText = "Тёмная тема";
            button.style.cssText = 'float: right; margin: 20px; background-color: #383a40; color: #dbdee1';
            state = false;
            GM_setValue("theme", "light");
        }
	}

    //спойлер
    replaceHtmlString('<div style="padding: 3px; background-color: #FFFFFF; border: 1px solid #d8d8d8; font-size: 1em;">', '<div style="padding: 3px; background-color: #383a40; border: 2px solid #232428; border-radius: 10px; padding: 5px; font-size: 1em;">');
    replaceHtmlString('<div style="text-transform: uppercase; border-bottom: 1px solid #CCCCCC; margin-bottom: 3px; font-size: 0.8em; font-weight: bold; display: block;">', '<div style="text-transform: uppercase; border-bottom: 2px solid #383a40; border-top: 2px solid #383a40; margin-bottom: 3px; font-size: 0.8em; font-weight: bold; display: block; padding: 5px;">');
    replaceHtmlString('Показать</a></span></div><div class="quotecontent">', 'Показать</a></span></div><div class="quotecontent: border: none;">');



    //новые сообщения
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_unread_hot_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_unread.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_unread_hot.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_unread_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_unread.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_unread_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_unread_locked.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_unread_locked_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_unread_locked.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_unread_locked_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_unread.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_unread_locked.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_unread_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_unread_locked_mine.gif" alt="Новые сообщения" title="Новые сообщения" width="19" height="18">', '<span class="dot" style="background-color: orange;"></span>');
    //прочитанные сообщения
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_read.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_read_hot_mine.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_read_hot.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_read_mine.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_read.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_read_mine.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_read_locked.gif" alt="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/sticky_read_locked_mine.gif" alt="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_read_locked.gif" alt="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." title="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_read_locked_mine.gif" alt="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." title="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_read.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_read_locked.gif" alt="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." title="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_read_mine.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/announce_read_locked_mine.gif" alt="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." title="Эта тема закрыта, вы не можете редактировать и оставлять сообщения в ней." width="19" height="18">', '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/topic_moved.gif" alt="Перенесённая" title="Перенесённая" width="19" height="18">', '<span class="dot"></span>');



    //кнопка ответить
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/button_topic_reply.gif" alt="Ответить на тему" title="Ответить на тему">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'Ответить');
    replaceHtmlString('<a href="./posting.php?mode=reply'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./posting.php?mode=reply');
    //кнопка "новая тема"
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/button_topic_new.gif" alt="Начать новую тему" title="Начать новую тему">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'Новая тема');
    //форум закрыт
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/button_topic_locked.gif" alt="Форум закрыт" title="Форум закрыт">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'Форум закрыт');
    replaceHtmlString('<a href="./posting.php?mode=post'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./posting.php?mode=post');
    //прыжок к сообщению
    replaceHtmlString('<img src="./styles/subsilver2/imageset/icon_post_target.gif" alt="На страницу" title="На страницу" width="12" height="9">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot"></span> ');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/icon_topic_latest.gif" alt="Перейти к последнему сообщению" title="Перейти к последнему сообщению" width="18" height="9">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot"></span>');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/icon_topic_newest.gif" alt="Перейти к первому непрочитанному сообщению" title="Перейти к первому непрочитанному сообщению" width="18" height="9">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="background-color: orange;"></span>');

    //остальные кнопки в посте
    //профиль
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/icon_user_profile.gif" alt="Профиль" title="Профиль">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'Профиль');
    replaceHtmlString('style="float: left;">&nbsp;<a href="./memberlist.php?'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'style="float: left;">&nbsp;<a class="postbtn" href="./memberlist.php?');
    //лс
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/icon_contact_pm.gif" alt="Отправить личное сообщение" title="Отправить личное сообщение">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'ЛС');
    replaceHtmlString('<a href="./ucp.php?i=pm&amp;mode=compose&'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./ucp.php?i=pm&amp;mode=compose&');
    //скайп
    replaceHtmlString(('<img src="./images/icon_contact_skype.png"'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')+' alt="Skype: [-a-zA-Z0-9@:%._\+~#=]*" title="Skype: [-a-zA-Z0-9@:%._\+~#=]*" border="0">'), 'Skype');
    replaceHtmlString('<a href="./memberlist.php?mode=contact&amp;action=skype'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./memberlist.php?mode=contact&amp;action=skype');
    //цитата
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/icon_post_quote.gif" alt="Ответить с цитатой" title="Ответить с цитатой">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'Цитата');
    replaceHtmlString('<a href="./posting.php?mode=quote&amp'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./posting.php?mode=quote&amp');
    //правка
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/icon_post_edit.gif" alt="Редактировать сообщение" title="Редактировать сообщение">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'Правка');
    replaceHtmlString('<a href="./posting.php?mode=edit&amp'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./posting.php?mode=edit&amp');
    //жалоба
    replaceHtmlString('<img src="./styles/subsilver2/imageset/ru/icon_post_report.gif" alt="Пожаловаться на это сообщение" title="Пожаловаться на это сообщение">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '!');
    replaceHtmlString('<a href="./report.php?f='.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<a class="postbtn" href="./report.php?f=');
    //сайт в поиске
    replaceHtmlString('"><img src="./styles/subsilver2/imageset/ru/icon_contact_www.gif" alt="Сайт" title="Сайт">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '" class="postbtn">www');

    //элита
    replaceHtmlString('0000CC', '0080FF');

    //фон ника в треде
    replaceHtmlString('<td valign="middle" align="center">', '<td style="background-color: #2b2d31;" valign="middle" align="center">');

    //иконки сверху (ФИКСИТЬ)
    replaceHtmlString(('<img src="./styles/subsilver2/theme/images/'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')+'[-a-zA-Z0-9@:%._\+~#=]*.gif"'+' alt="*" width="12" height="13">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')), '<span class="dot"></span> ');

    //иконки мессенджеров

    //иконки постов в теме
    replaceHtmlString('<img src="./styles/subsilver2/imageset/icon_post_target_unread.gif" alt="Новое сообщение" title="Новое сообщение" width="12" height="9">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="background-color: orange;"></span> ');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/icon_post_target.gif" alt="Сообщение" title="Сообщение" width="12" height="9">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot"></span> ');

    //иконка пола?

    //правила форума
    replaceHtmlString('<h3 style="color:red">Правила форума</h3>', '<h3>Правила форума</h3>');

    //большие иконки
    replaceHtmlString('<img src="./styles/subsilver2/imageset/forum_unread.gif" alt="Новые сообщения" title="Новые сообщения" width="46" height="25">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="margin: 0 20px; border: 3px solid orange; background-color:#313338; width:20px; height:20px;"></span> ');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/forum_unread_subforum.gif" alt="Новые сообщения" title="Новые сообщения" width="46" height="25">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="margin: 0 20px; border: 3px solid orange; background-color:#313338; width:20px; height:20px;"></span> ');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/forum_unread_locked.gif" alt="Форум закрыт" title="Форум закрыт" width="46" height="25">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="margin: 0 20px; border: 3px solid orange; background-color:#313338; width:20px; height:20px;"></span> ');

    replaceHtmlString('<img src="./styles/subsilver2/imageset/forum_read.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="46" height="25">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="margin: 0 20px; border: 3px solid #dbdee1; background-color:#313338; width:20px; height:20px;"></span> ');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/forum_read_subforum.gif" alt="Нет новых сообщений" title="Нет новых сообщений" width="46" height="25">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="margin: 0 20px; border: 3px solid #dbdee1; background-color:#313338; width:20px; height:20px;"></span> ');
    replaceHtmlString('<img src="./styles/subsilver2/imageset/forum_read_locked.gif" alt="Нет новых сообщений [ Тема закрыта ]" title="Нет новых сообщений [ Тема закрыта ]" width="46" height="25">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '<span class="dot" style="margin: 0 20px; border: 3px solid #dbdee1; background-color:#313338; width:20px; height:20px;"></span> ');

    var current_link = window.location.href;
    //пустой столбец
    if (current_link.includes ('search.php?search_id')) {
        replaceHtmlString('<td class="row1" width="25" align="center">\n						</td>', '');
        replaceHtmlString('</a></p>\n							</td>'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '</a></p><br>\n							</td><td class="row1" width="25" align="center"></td>');
    }

    if (current_link.includes ('forumsbio/viewforum.php?')) {
        replaceHtmlString('<img src="./styles/subsilver2/imageset/icon_topic_attach.gif" alt="Вложения" title="Вложения" width="14" height="18">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '');
        replaceHtmlString('<a title="Добавлено', '<br><a title="Добавлено');
        replaceHtmlString('<span class="dot" style="background-color: orange;"></span></a>					 <br>', '<br><span class="dot" style="background-color: orange;"></span></a>					 ');
        replaceHtmlString('<b>Опрос: </b> <br>', '<br><b>Опрос: </b> ');
        replaceHtmlString('unread"><span class="dot" style="background-color: orange;"></span></a>					 <br><b>Опрос'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'unread"><br><span class="dot" style="background-color: orange;"></span></a>					 <b>Опрос');
        replaceHtmlString('<b>Перемещена: </b> <br>', '<br><b>Перемещена: </b> ');
        replaceHtmlString('unread"><span class="dot" style="background-color: orange;"></span></a>					 <br><b>Перемещена'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'unread"><br><span class="dot" style="background-color: orange;"></span></a>					 <b>Перемещена'); //господи даже перемещённые темы!!!!
    }

    //ликан
    replaceHtmlString(' title="RUSBIONICLE - Русскоязычный сайт о Bionicle (Бионикл)" alt="RUSBIONICLE - Русскоязычный сайт о Bionicle (Бионикл)">'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'style="border-radius:25px; width:415px; height:85px; object-fit: none;"  title="RUSBIONICLE - Русскоязычный сайт о Bionicle (Бионикл)" alt="RUSBIONICLE - Русскоязычный сайт о Bionicle (Бионикл)">');

    //список иконок который меня выбесил и я его целиком нюкнул
    replaceHtmlString('<tbody><tr>\n				<td style="text-align: center;" width="20"><span class="dot" style="background-color: orange;"></span></td>\n				<td class="gensmall">Новые сообщения</td>\n				<td>&nbsp;&nbsp;</td>\n				<td style="text-align: center;" width="20"><span class="dot"></span></td>\n				<td class="gensmall">Нет новых сообщений</td>\n				<td>&nbsp;&nbsp;</td>\n				<td style="text-align: center;" width="20"><img src="./styles/subsilver2/imageset/announce_read.gif" alt="Объявление" title="Объявление" width="19" height="18"></td>\n				<td class="gensmall">Объявление</td>\n			</tr>\n			<tr>\n				<td style="text-align: center;"><img src="./styles/subsilver2/imageset/topic_unread_hot.gif" alt="Новые сообщения [ Популярная тема ]" title="Новые сообщения [ Популярная тема ]" width="19" height="18"></td>\n				<td class="gensmall">Новые сообщения [ Популярная тема ]</td>\n				<td>&nbsp;&nbsp;</td>\n				<td style="text-align: center;"><img src="./styles/subsilver2/imageset/topic_read_hot.gif" alt="Нет новых сообщений [ Популярная тема ]" title="Нет новых сообщений [ Популярная тема ]" width="19" height="18"></td>\n				<td class="gensmall">Нет новых сообщений [ Популярная тема ]</td>\n				<td>&nbsp;&nbsp;</td>\n				<td style="text-align: center;"><img src="./styles/subsilver2/imageset/sticky_read.gif" alt="Прилепленная" title="Прилепленная" width="19" height="18"></td>\n				<td class="gensmall">Прилепленная</td>			\n			</tr>\n			<tr>\n				<td style="text-align: center;"><img src="./styles/subsilver2/imageset/topic_unread_locked.gif" alt="Новые сообщения [ Тема закрыта ]" title="Новые сообщения [ Тема закрыта ]" width="19" height="18"></td>\n				<td class="gensmall">Новые сообщения [ Тема закрыта ]</td>\n				<td>&nbsp;&nbsp;</td>\n				<td style="text-align: center;"><img src="./styles/subsilver2/imageset/topic_read_locked.gif" alt="Нет новых сообщений [ Тема закрыта ]" title="Нет новых сообщений [ Тема закрыта ]" width="19" height="18"></td>\n				<td class="gensmall">Нет новых сообщений [ Тема закрыта ]</td>\n				<td>&nbsp;&nbsp;</td>\n				<td style="text-align: center;"><img src="./styles/subsilver2/imageset/topic_moved.gif" alt="Перенесённая" title="Перенесённая" width="19" height="18"></td>\n				<td class="gensmall">Перенесённая</td>\n			</tr>\n			</tbody>'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), '');


    const data = JSON.parse(GM_getResourceText("DATABASE"));

    // замена рангов
    // в постах...
    var profiles = document.querySelectorAll('td.profile'); // сведения о пользователе в постах
    profiles.forEach((profile) => {
        var postDetails = profile.querySelector('span.postdetails') // тут ищем число сообщений
        var tdPostDetails = profile.querySelector('td.postdetails') // тут название ранга
        if (postDetails && tdPostDetails) {
            var userData = postDetails.querySelectorAll('b');
            if (userData[0].innerText != "Предупреждения:") {
                var numberOfPosts1 = parseInt(userData[1].nextSibling.data) // число постов в темах
                var topicRank = tdPostDetails.innerText;
                if (!topicRank.toLowerCase().includes('администратор') && !topicRank.toLowerCase().includes('модератор') && !topicRank.toLowerCase().includes('узник')) {
                    for (var i = 0; i < data.length; i++) {
                        if (numberOfPosts1 < data[i]['postNumber']) {
                            var rankIcon = profile.querySelector('img[src*="./images/ranks/"]')
                            rankIcon.src = rankIcon.src.replace(rankIcon.src, data[i-1]['rankIcon']);
                            rankIcon.setAttribute("alt", data[i-1]['rankName']);
                            rankIcon.setAttribute("title", data[i-1]['rankName']);
                            profile.querySelector('td.postdetails').innerText = data[i-1]['rankName'];
                            break;
                        }
                        else if (numberOfPosts1 >= data[data.length-1]['postNumber']) {
                            rankIcon = profile.querySelector('img[src*="./images/ranks/"]')
                            rankIcon.src = rankIcon.src.toLowerCase().replace(rankIcon.src, data[i]['rankIcon']);
                            rankIcon.setAttribute("alt", data[i]['rankName']);
                            rankIcon.setAttribute("title", data[i]['rankName']);
                            profile.querySelector('td.postdetails').innerText = data[i-1]['rankName'];
                        }
                    }
                }
            }
        }
    });

    // ...и на странице пользователей
    var row = document.querySelectorAll('tr.row1, tr.row2'); // сведения о пользователе в списке пользователей
    if (row.length == 50) { // потому что на странице 50 пользователей (чтобы не мешало остальному форуму)
        row.forEach((td) => {
            var userDataInUsers = td.querySelectorAll('td.gen');
            var numberOfPosts2 = parseInt(userDataInUsers[1].innerText); // число постов в списке пользователей
            var usersRank = userDataInUsers[2].innerHTML; // ранг в списке пользователей
            var rankText = usersRank.split("\"")[usersRank.split("\"").length-2];
            if ((rankText) && (!rankText.toLowerCase().includes('администратор') && !rankText.toLowerCase().includes('модератор') && !rankText.toLowerCase().includes('узник'))) {
                for (var i = 0; i < data.length; i++) {
                    if (numberOfPosts2 < data[i]['postNumber']) {
                        var rankIcon = td.querySelector('img[src*="./images/ranks/"]')
                        rankIcon.src = rankIcon.src.replace(rankIcon.src, data[i-1]['rankIcon']);
                        rankIcon.setAttribute("alt", data[i-1]['rankName']);
                        rankIcon.setAttribute("title", data[i-1]['rankName']);
                        break;
                    }
                    else if (numberOfPosts2 >= data[data.length-1]['postNumber']) {
                        rankIcon = document.querySelector('img[src*="./images/ranks/"]')
                        rankIcon.src = rankIcon.src.toLowerCase().replace(rankIcon.src, data[i]['rankIcon']);
                        rankIcon.setAttribute("alt", data[i]['rankName']);
                        rankIcon.setAttribute("title", data[i]['rankName']);
                    }
                }
            }
        });
    }
    // ещё и страница профиля...
    var userProfileRank = document.querySelector('td.postdetails'); // ранг в профиле
    var canProfile = userProfileRank ? userProfileRank.innerText : ""; // тест на возможность спарсить ранг (если мы не на странице профиля)
    if (canProfile) {
        userProfileRank = userProfileRank.innerText;
        if (!userProfileRank.toLowerCase().includes('администратор') && !userProfileRank.toLowerCase().includes('модератор') && !userProfileRank.toLowerCase().includes('узник')) {
            var bGen = document.querySelectorAll('b.gen')
            bGen.forEach((tag) => {
            if (!isNaN(parseInt(tag.innerText))) {
                var numberOfPosts3 = parseInt(tag.innerText) // число постов в профиле
                for (var i = 0; i < data.length; i++) {
                    if (numberOfPosts3 < data[i]['postNumber']) {
                        var rankIcon = document.querySelector('img[src*="./images/ranks/"]')
                        rankIcon.src = rankIcon.src.replace(rankIcon.src, data[i-1]['rankIcon']);
                        rankIcon.setAttribute("alt", data[i-1]['rankName']);
                        rankIcon.setAttribute("title", data[i-1]['rankName']);
                        document.querySelector('td.postdetails').innerText = data[i-1]['rankName']
                        break;
                    }
                    else if (numberOfPosts3 >= data[data.length-1]['postNumber']) {
                        rankIcon = document.querySelector('img[src*="./images/ranks/"]')
                        rankIcon.src = rankIcon.src.replace(rankIcon.src, data[i]['rankIcon']);
                        rankIcon.setAttribute("alt", data[i]['rankName']);
                        rankIcon.setAttribute("title", data[i]['rankName']);
                        document.querySelector('td.postdetails').innerText = data[i]['rankName']
                    }
                }
            }
       })
    }
    }
    // иконки онлайн-оффлайн
    document.querySelectorAll('img[src*="whosonline.gif"]').forEach((image) => {
			image.src = image.src.replace('https://www.rusbionicle.com/forumsbio/styles/subsilver2/theme/images/whosonline.gif', 'https://raw.githubusercontent.com/OSP-Scata/RB-Visual-Overhaul/refs/heads/main/icons/whosonline.png');
		})
    document.querySelectorAll('img[src*="./styles/subsilver2/imageset/ru/"]').forEach((image) => {
			image.src = image.src.replace('https://rusbionicle.com/forumsbio/styles/subsilver2/imageset/ru/icon_user_offline.gif', 'https://raw.githubusercontent.com/OSP-Scata/RB-Visual-Overhaul/refs/heads/main/icons/icon_user_offline.png');
        image.src = image.src.replace('https://www.rusbionicle.com/forumsbio/styles/subsilver2/imageset/ru/icon_user_offline.gif', 'https://raw.githubusercontent.com/OSP-Scata/RB-Visual-Overhaul/refs/heads/main/icons/icon_user_offline.png');
            image.src = image.src.replace('https://rusbionicle.com/forumsbio/styles/subsilver2/imageset/ru/icon_user_online.gif', 'https://raw.githubusercontent.com/OSP-Scata/RB-Visual-Overhaul/refs/heads/main/icons/icon_user_online.png');
        image.src = image.src.replace('https://www.rusbionicle.com/forumsbio/styles/subsilver2/imageset/ru/icon_user_online.gif', 'https://raw.githubusercontent.com/OSP-Scata/RB-Visual-Overhaul/refs/heads/main/icons/icon_user_online.png');
		})

/*
    // реплейс существующих иконок рангов (старое)
    function updateImagesSrc() {
		document.querySelectorAll('img[src*="./images/ranks/"]').forEach((previewImage) => {
			previewImage.src = previewImage.src.toLowerCase().replace('https://www.rusbionicle.com/forumsbio/images/ranks/', 'https://brickshelf.com/gallery/Roodaka8761/Bionicle/RB-new-ranks/');
		})
	}

	if(document.readyState == 'complete') {
    updateImagesSrc();
} else {
    window.addEventListener('load', updateImagesSrc);
} */
})();
