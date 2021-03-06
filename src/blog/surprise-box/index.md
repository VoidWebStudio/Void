---
title: 'Коробка с cюрпризами'
date: 2008-11-07
tags: post
layout: post.njk
---

Сначала мы [боялись](/blog/im-not-coward-but-hell/), потом вроде [взяли себя в руки](/blog/ie-street-magic/), приняв происходящее за простые и понятные фокусы. Сегодня пришло время удивляться снова — фокусы IE8 с переключением режимов рендеринга оказались хитрее, чем казалось поначалу. Что же мы знаем про магическую директиву `x-ua-compatible`?

- Эта директива в виде элемента `<meta>` должна присутствовать в документе.
- В ней должно быть указано одно из двух типов значений: `ie=x`, где `x` — это обозначение желаемой версии движка или специальное ключевое слово `EmulateIE7`.
- …и, в общем-то, всё.

Давайте проверим, скормив IE8 простой документ:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ru">
    <head>
        <title>IE=x</title>
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=x">
        <style type="text/css">
            body[class*='page'] {
                background:#090; /* IE8 и прочие современные */
            }

            *:first-child + html .page {
                background: #fc0; /* IE7, исключительно */
            }

            * html .page {
                background: #c00; /* IE6 и младше */
            }
        </style>
    </head>
    <body class="page"></body>
    </html>

Меняя значение `IE=x` последовательно — 8, 7, 6 — мы переключаем режимы рендеринга IE и получаем [такой светофор](images/traffic-lights.png). Красивую расцветку обеспечили нам специальные CSS-фильтры для каждой версии IE:

- `E[att*='val']` — IE8 и прочие современные браузеры, селектор выборки подстрок атрибутов из [черновика CSS 3](http://www.w3.org/TR/css3-selectors/#attribute-substrings). Да-да, из _черновика_, который IE8 не собирался поддерживать…
- `*:first-child+HTML E` — IE7, исключительно. Просто милый хак, в очередной раз обыгрывающий странное понимание разработчиками IE понятия _корневой элемент_.
- `* HTML E` — IE6 и младше, знаменитый _Star HTML Hack_, что бы мы без него делали.

Ну что — пока без сюрпризов, почти скучно. А давайте-ка подключим к документу фавиконку. Вставим её куда-нибудь в элемент `<head>`, произвольно:

    <head>
        <title>IE=x</title>
        <meta http-equiv="content-type" content="text/html;charset=utf-8">
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
        <meta http-equiv="x-ua-compatible" content="ie=x">
    </head>

…и вот здесь начинается самое интересное — все документы позеленели, при любых значениях `IE=x`. И это фактически означает то, что IE8 просто перестал воспринимать директиву `X-UA-Compatible`.

Нет, дело совсем не в фавиконке. Дело в новом расположении элемента `<meta>` с нашей чудо-директивой. Теперь мета-информация о режиме рендеринга документа становится известна _после_ появления первых элементов самого документа и успешно игнорируется.

В ходе тестов выяснилось, что предшествовать директиве могут только мета-элементы и `<title>` — по сути тоже часть мета-описания документа. Все остальные варианты расположения директивы делают её абсолютно неработоспособной.

Эксперименты это конечно хорошо, но хочется знать наверняка, поэтому полчаса копания в [MSDN](http://msdn.microsoft.com/) дали однозначный ответ в статье «[Defining Document Compatibility](http://msdn.microsoft.com/en-us/magazine/cc288325(VS.85).aspx)» — все предположения оказались верны:

> Являясь регистронезависимым, заголовок X-UA-compatible, тем не менее, должен находиться в секции HEAD страницы перед всеми остальными элементами, за исключением title и других мета-элементов.

Вывод из всей этой истории напрашивается следующий: для успешной борьбы, врага нужно знать в лицо. Пусть даже ценой чтения сомнительной документации по MSHTML.
