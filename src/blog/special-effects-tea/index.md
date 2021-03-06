---
title: 'Чай со спецэффектами'
date: 2009-12-24
tags: post
layout: post.njk
---

Как обычные люди готовят себе чай? Довольно просто: ставят чайник, находят чашку, закидывают пакетик или даже заливают заварку. Просто и безыскусно. Сегодня я расскажу вам, как готовят чай суровые верстальщики.

Для этого вам понадобятся следующие вещи: простой текстовый редактор и свежий браузер, вроде [Firefox](http://getfirefox.com/), [Opera](http://opera.com/), [Safari](http://apple.com/safari/) или [Chrome](http://google.com/chrome/). Чем свежее, тем лучше — хорошо бы даже ночную сборку или какую-нибудь альфу.

## Готовим основу

Для начала подготовим основу для нашего чаепития. На мой взгляд, прогрессивный HTML5-шаблон с простым доктайпом `<!DOCTYPE HTML>` подойдёт лучше всего:

    <!DOCTYPE HTML>
    <html lang="en-US">
    <head>
        <title>Чай со спецэффектами</title>
        <meta charset="UTF-8">
    </head>
    <body>
        …
    </body>
    </html>

Обратите внимание на атрибут `lang` элемента `<html>` — мы собираемся заваривать английский чай с американским акцентом, и его значение как раз соответствует нашему замыслу: `en-US`. Дальше нам это ещё пригодится.

Теперь давайте отыщем подходящую чашку. Точнее, даже не отыщем, а тут же соберём из знакомых частей. Из чего мы можем составить обычную чашку чая? Как минимум, из самой чашки `cup` и блюдца `saucer`. Чашка состоит из сосуда `vessel` с ручкой `handle`, в который последовательно налиты чай `tea`, брошены два кусочка сахара `sugar`, по вкусу, а замыкается это всё донышком `bottom`. Так у нас и получилось:

    <div class="cup">
        <div class="vessel">
            <div class="tea">
                <div class="sugar"></div>
                <div class="sugar"></div>
                <div class="bottom"></div>
            </div>
        </div>
        <div class="handle"></div>
    </div>
    <div class="saucer"></div>

Итак, основа для нашего чаепития готова, начинаем его рисовать.

## Раскрашиваем набросок

Теперь отбросим все браузерные условности простым ластиком. Чай у нас незамысловатый, поэтому здесь подойдёт и `* { … }`. Для более сложных проектов всё же рекомендуется использовать [reset.css](http://meyerweb.com/eric/tools/css/reset/)

    * {
        padding: 0;
        margin: 0;
    }

Наступает очередь воплотить все составные части нашего чая: позиционируем их по центру, правильно расставляем z-index, задаём размеры и цвет фона для каждого элемента. Вот как выглядит чашка:

    .cup {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        margin: -150px 0 0 -150px;
        width: 300px;
        height: 300px;
    }

…и получаем [пример №1](demo/1.html), он же [на картинке](images/1.png).

Если вы остались довольны получившимся кубизмом — хорошо, значит вас устроит чаепитие даже в компании Internet Explorer. Те, кому этого мало, приглашаются дальше.

## Спиливаем лишнее

И всё-таки, чашка должна быть круглой. Хотя бы для того, чтобы во время размешивания там не застревала чайная ложка. Давайте всё скруглим. После недавнего выхода [альфа-версии Opera 10.50](http://labs.opera.com/news/2009/12/22/) с широкой поддержкой модуля [CSS Backgrounds and Borders Level 3](http://www.w3.org/TR/css3-background/) для этих целей мы вполне можем рассчитывать на свойство `border-radius`.

Скругляем блюдце: его ширина и высота равны 500-м пикселям, значит для того, чтобы получить окружность, радиус скругления должен составлять половину ширины, т.е. 250 пикселей:

    .saucer {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        margin: -250px 0 0 -250px;
        width: 500px;
        height: 500px;
        -webkit-border-radius: 250px;
        -moz-border-radius: 250px;
        border-radius: 250px;
        background: #FFF;
    }

В данном случае компактное правило `border-radius: 250px` задаёт радиус скругления всех четырёх углов, точно так же, как `margin: 0` обнуляет поля со всех четырёх сторон элемента.

Обратите внимание на префиксы `-webkit` и `-moz` — они нужны браузерам на основе Webkit (Safari, Chrome) и Gecko (Firefox) для того, чтобы применить скругление. Последняя альфа браузера Opera обрабатывает свойство без префикса. Подобным же образом мы скругляем сосуд, чай и донышко. Ручку и подтаявшие кусочки сахара мы подтачиваем до скруглённых брусков.

И получаем [пример №2](demo/2.html), он же [на картинке](images/2.png).

И хорошо бы: всё скруглилось, встало на свои места. Так ведь и просилась бы чашка в руки, если бы не пугала своей плоской двухмерностью. Самое время добавить немного объёма.

## Надуваем чашку

Будем честны, мы здесь не пытаемся заигрывать с [Canvas](http://www.whatwg.org/specs/web-apps/current-work/#the-canvas-element), поэтому объём у нас будет псевдо-трёхмерным. А много ли надо нам, жертвам квадратного и плоского веба? Берём в руки свойство `box-shadow` и вперёд:

    .vessel {
        -webkit-box-shadow: 20px 20px 100px rgba(0,0,0,.8);
        -moz-box-shadow: 20px 20px 100px rgba(0,0,0,.8);
        box-shadow: 20px 20px 100px rgba(0,0,0,.8);
    }

Свойство `box-shadow` конструируется просто: горизонтальное смещение тени, вертикальное, размер и цвет, который мы задаём в виде `rgba()`, чтобы последним значением указать полупрозрачность заливки. В случае с элементом `tea`, также используется ключевое слово `inset`, чтобы повернуть тень внутрь элемента.

И вот [пример №3](demo/3.html), он же [на картинке](images/3.jpg).

Ну, что — чай уже почти как настоящий. За исключением некоторых проблем: тени в браузерах на движке Webkit рассчитываются весьма загадочно (см. заметку [Firefox против Photoshop](/blog/firefox-vs-photoshop/)), поэтому, в нашем случае, выглядят более жёстко. Также текущая версия Webkit в браузере Safari 4.0.4 пока не умеет применять ключевое слово `inset`, однако Chrome уже справляется.

Осталось только добавить в это чаепитие немного жизни.

## Художественный беспорядок

Самая очевидная проблема нашей чашки — это отвалившаяся ручка и вставшие пирамидой кусочки сахара. Давайте разбросаем всё это по своим местам и попробуем размешать сахар. Поможет нам в этом свойство `transform` и методы `rotate()` и `translate()`, занимающиеся, соответственно, поворотом и перемещением элементов.

Обратите внимание, что для краткости в этой части примеры кода будут приводится без дублирования свойств с префиксами `-webkit`, `-moz` и `-o`. Полный код вы можете найти в примерах.

Для начала, вернём ручку ровно в центр чашки, изменив значение отрицательного поля, а потом применим `transform`: повернём на –145 градусов и сместим на 170 пикселей.

    .handle {
        margin: -20px 0 0 -45px;
        transform: rotate(-145deg) translate(170px,0);
    }

Принимаемся за кубики: их у нас ровно два. Не знаю, как для вас, но для меня это оптимальное количество сахара. И нам нужно обратиться к каждому из кубиков, чтобы применить нужное смещение. Самым удачным способом будет посчитать их по порядку появления в чае, при помощи селектора `:nth-child()`:

    .sugar:nth-child(1) {
        transform: rotate(70deg) translate(-20px,20px);
    }

    .sugar:nth-child(2) {
        transform: rotate(30deg) translate(35px,0);
    }

Теперь всё на месте, и вроде бы можно пить чай, но сахар упорно не желает размешиваться. Значит, самое время встряхнуть его при помощи сочетания свойств `transform` и `transition`. Для начала мы задаём каждому кубику новое смещение, которое произойдёт при наведении на чашку: поворот на 1200 градусов и новые координаты.

    .cup:hover
    .sugar:nth-child(1) {
        transform: rotate(1200deg) translate(-20px,20px);
    }

А затем описываем сам процесс перемещения:

    .sugar {
        transition: transform 10s ease-out;
    }

Синтаксис свойства `transition` простой: сначала идёт то свойство, которое мы собираемся изменять, потом время и тип ускорения, в нашем случае `ease-out`, что значит с замедлением. При наведении курсора на чашку `.cup:hover` сахар будет размешиваться по часовой стрелке, при отведении — в обратную сторону.

И вот [пример №4](demo/4.html), он же [на картинке](images/4.jpg).

Практически всё готово. Самые нетерпеливые могут браться за чай, остальные же приглашаются дальше — добавить разнообразия.

## Немного разнообразия

Сколько людей, столько и вкусов. Поэтому давайте добавим нашему чаепитию возможность выбрать в какой традиции пить чай: в английской, русской или японской. Предлагаю сделать это наиболее адекватно, используя упомянутый выше атрибут `lang` элемента `<html>`. Для этого добавим возможность выбора:

    <ul class="switcher">
        <li lang="en-US" title="Английски"></li>
        <li lang="ru-RU" title="Русский"></li>
        <li lang="ja-JP" title="Японский"></li>
    </ul>

Каждый из пунктов нашего меню будет переключать атрибут `lang` на нужный язык при помощи нехитрого скрипта, навешивающего обработчики:

    function init() {
        var html = document.documentElement;
        var items = document.querySelectorAll('ul.switcher li');
        for(var i=0; i<items.length; i++){
            items[i].onclick = function() {
                html.lang = this.lang;
            }
        }
    }
    window.onload = init;

В этом скрипте используется удобнейший метод `querySelectorAll`, который позволяет выбрать нужные элементы при помощи CSS-селекторов наподобие [jQuery](http://jquery.com/).

Осталось только добавить специфические стили для каждого из языков (тематическую скатерть и цвет чая) и поменять состояние текущего пункта меню. Вся магия происходит благодаря псевдо-классу `:lang()`, который появляется у каждого элемента после того, как мы обновили атрибут `lang` элемента `<html>`:

    body:lang(en-US) {
        background: #519AB8 url(i/en.png);
    }

    .switcher:lang(en-US) li[lang=en-US],
    .switcher:lang(ru-RU) li[lang=ru-RU],
    .switcher:lang(ja-JP) li[lang=ja-JP] {
        border-color: #FFF;
        cursor: default;
    }

И, наконец, последний [пример №5](demo/5.html), он же [на картинке](images/5.jpg). Чай готов, сахар по вкусу — можно пить :)
