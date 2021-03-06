---
title: 'Семантическая вёрстка. Часть первая'
date: 2008-04-22
tags: post
layout: post.njk
---

Современный взгляд на организацию кода. По материалам доклада «Семантическая вёрстка» на конференциях [ClientSide 2007](http://www.client2007.ru/) и [UA Web 2008](http://uaweb.in.ua/).

Начало. Продолжение — «[Семантическая вёрстка. Часть вторая](/blog/semantic-coding-2/)».

Прежде всего, давайте договоримся: семантическая вёрстка — это не гербалайф. Она не поможет вам в одночасье научиться верстать в восемь раз быстрее, IE6 вдруг не перестанет бажить, да и волосы не станут гладкими и шелковистыми, скорее наоборот. Более того, использование данного подхода потребует от вас бóльших умственных усилий. Как на освоение методики, так и в работе с ней.

В чём же смысл? Зачем я предлагаю использовать подход, который, на первый взгляд, только усложняет жизнь? Просто поверьте — оно того стоит, но обо всём по порядку.

## Семантика?

> Семантика (фр. sémantique от греч. σημαντικός — обозначающий)

Понятие «семантика» пришло к нам из лингвистики в несколько сокращённом значении для того, чтобы можно было применить его к HTML-вёрстке. Прежде всего, семантика в вёрстке — это совокупность смысловых отношений, возникающих в документе. Однако для существования таких отношений необходим документ, который возникает благодаря внедрению HTML-разметки в простой текст.

## Сайт, страница, документ

Для более уверенного разговора на эту тему, будет полезно договориться о терминах:

- Сайт — это совокупность страниц
- Страница — это то, что увидел пользователь, после применения к документу стилей и JavaScript
- Документ — это то, что получает браузер, поисковик или пользователь, у которого отключены или не подгрузились стили

Таким образом, для разговора о семантике нам необходим валидный, семантически верно размеченный HTML-документ.

## Смысловые связи

Откуда же берутся пресловутые смысловые связи, составляющие основу семантики? Если бы речь шла о лингвистике, то следующий пример легко бы продемонстрировал смысловую связь между левой и правой частями предложения: _означающее_ и _означаемое_, отношение которых рождает _значение_.

> Семантика — совокупность смысловых отношений.

Однако мы ведём речь о семантике относительно HTML-вёрстки, поэтому разметим указанный пример при помощи элемента `<dl>`, предназначенного для создания списка определений (definition list).

    <dl>
        <dt>Семантика</dt>
        <dd>совокупность смысловых отношений.</dd>
    </dl>

Итак, перед нами термин `<dt>` (definition term) и его определение `<dd>` (definition description), которые связаны теми же смысловыми отношениями, что и _означающее_ и _означаемое_ в изначальном предложении.

Однако особенность нашей ситуации состоит в том, что для существования подобных связей нам не требуется осмысленного предложения. Все смысловые отношения продиктованы нам контейнером `<dl>`. По этой причине, текст внутри элементов `<dt>` и `<dd>` может быть абсолютно любым:

    <dl>
        <dt>.........</dt>
        <dd>.................................</dd>
    </dl>

Создавать логически стройный текст документа — это забота редактора, наше же дело — формировать абстрактную логику документа. Из чего следует, что семантические связи в документе существует только между HTML-элементами, а не между отдельными словами или частями текста.

## Уровни семантики

Создание семантически верного документа — это не только использование HTML-элементов по назначению. Существует три уровня существования семантики в HTML-документе — от самого простого к более сложному:

- Применение HTML-элементов
- Именование элементов
- Комбинация именованных элементов

Рассмотрим, в качестве примера всех трёх уровней, разметку простой информации:

    Алексей Рыбаков, alex@example.com

Для начала правильно разметим информацию при помощи HTML-элементов. Озаглавим персону элементом `<h3>` и отметим _адрес_ электронной почты при помощи элемента `<address>`:

    <h3>Алексей Рыбаков</h3>
    <address>alex@example.com</address>

Затем, в случае необходимости дополнительного оформления элементов, правильно назовём классы для _имени_ (name) и _электронной почты_ (email):

    <h3 class="name">Алексей Рыбаков</h3>
    <address class="email">alex@example.com</address>

И, наконец, усложним разметку при помощи микроформата [hCard](http://microformats.org/wiki/hcard) настолько, что строка текста превратится в полноценную визитную карточку. Корневой класс `vcard`, точное указание на _имя_ (given-name), _фамилию_ (family-name) и _электронную почту_ (email) персоны:

    <div class="vcard">
        <h3 class="fn n">
            <span class="given-name">Алексей</span>
            <span class="family-name">Рыбаков</span>
        </h3>
        <address class="email">alex@example.com</address>
    </div>

А теперь рассмотрим подробнее каждый из уровней.

## Первый уровень семантики: применение HTML-элементов

С чего же мы взяли, что, к примеру, элемент `<h1>` должен быть заголовком первого уровня, а `<ul>` неупорядоченным списком? Информация о всех элементах той версии языка, с которой вы работаете, содержится в DTD (Document Type Definition), либо в спецификации соответствующей версии.

Перед вами фрагмент DTD [спецификации HTML 4.01](http://www.w3.org/TR/html401/):

    <!ENTITY % heading "H1|H2|H3|H4|H5|H6">
    <!--
    There are six levels of headings from H1 (the most important)
    to H6 (the least important).
    -->
    <!ELEMENT (%heading;) - - (%inline;)* -- heading -->
    <!ATTLIST (%heading;)
    %attrs; -- %coreattrs, %i18n, %events --
    >

Обратите внимание на комментарий:

> Существуют шесть уровней заголовков: от H1 (самого значимого) до H6 (наименее значимого).

Таким образом, получается, что все особенности применения элемента и смысловые связи, которые образует с остальными элементами, расписаны в спецификации, остаётся только научиться использовать эту информацию. Конечно, такие подробности удобнее всего выяснять в полной спецификации, но наличие ссылки на DTD в `<DOCTYPE>` вашего документа, теперь становится ещё более очевидным.

Подобное использование HTML-элементов по их назначению, получило название [POSH](http://microformats.org/wiki/posh) (Plain Old Semantic HTML) — проще говоря, «старый добрый семантический HTML».

Рассмотрим пример типичной «дивной» вёрстки:

    <div id="menu">
        <a href="#">Колбаса</a>
        <br>
        <a href="#">Макароны</a>
        <br>
        <a href="#">Тушёнка</a>
    </div>

Формально, такой код подходит популярному нынче требованию «дивной» или «бестабличной» вёрстки. Таблиц нет, див есть и даже внятно именован, код вполне может нормально отображаться во всех браузерах. Чего же боле?

Давайте всё же попробуем разметить этот текст в соответствии с той информацией, что в нём содержится. Включаем мозг и анализируем, что же мы видим:

- Корневой _группирующий_ элемент
- _Неупорядоченный_ список продуктов
- Элемент _визуального_ форматирования — `<br>`

Исходя из увиденного, практически не остаётся сомнений, каким образом разметить эту информацию: неупорядоченный список `<ul>` c элементами списка `<li>` внутри, а визуальное форматирование — в CSS.

    <ul id="menu">
        <li><a href="#">Колбаса</a></li>
        <li><a href="#">Макароны</a></li>
        <li><a href="#">Тушёнка</a></li>
    </ul>

Но это довольно очевидный пример, как и табличные макеты старой школы вёрстки. В то же время, существуют пограничные ситуации, когда принятие решения о разметке зависит от визуальных особенностей вывода информации и общих идеологических склонностей верстальщика. Кто-то, в отдельно взятой ситуации, использует неупорядоченный список и заголовки, кто-то список определений, а кто-то, нисколько не стесняясь, влепит таблицу.

В качестве примера можно привести ситуацию с разметкой подобной информации:

    Колбаса 100 гр. 250 руб.
    Макароны 100 гр. 18 руб.
    Тушёнка 100 гр. 75 руб.

С одной стороны — это типичная таблица:

    <table>
    <tr>
        <td>Колбаса</td>
        <td>100 гр.</td>
        <td>250 руб.</td>
    </tr>
    <tr>
        <td>Макароны</td>
        <td>100 гр.</td>
        <td>18 руб.</td>
    </tr>
    <tr>
        <td>Тушёнка</td>
        <td>100 гр.</td>
        <td>75 руб.</td>
    </tr>
    </table>

У нас есть ряды, есть столбцы со схожими типами значений. И неплохо было сделать этой таблице шапку с `<th>` для выделения столбцов. Но потом на ваши попытки сделать логичную разметку смотрит дизайнер и наотрез отказывается крутить какую-то шапку списку продуктов, а вес и цена должны, оказывается идти тут же, через пробел, а не в каких-то ячейках.

И тут возникает понимание, что дизайнер, в общем-то, прав:

- Информации довольно мало, восприятие не затруднено объёмом информации
- Структурная связность в строки или столбцы минимальная
- Наконец, это просто список продуктов, а не таблица значений

И дальше? А дальше уже решать вам, в каждой ситуации. Остаётся только добавить, что таблица — это развившийся список, в который внедрены дополнительные механизмы, облегчающие поиск и визуальную группировку данных по строкам и столбцам. Если эти механизмы не работают, а вам всего лишь нужно провести горизонтальные линии у каждого пункта, то задумайтесь — таблица ли это? И так далее… Интересно, правда?

[Продолжение следует…](../semantic-coding-2/)
