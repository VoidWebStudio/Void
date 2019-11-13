---
title: 'Переменные в CSS'
date: 2008-02-07
tags: post
layout: post.njk
---

Давайте помечтаем вместе с [Йенсом Майертом](http://meiert.com/en/) (Jens Meiert) о реализации механизма переменных в CSS: [CSS: Selector Variables](http://meiert.com/en/blog/20080207/selector-variables/). Суть предложенного решения проста: мы просто задаём псевдоним группе селекторов: `@E = F` и дальше используем его в коде, избегая лишних повторений.

Типичный код до использования переменных:

    .messages-list .highlighted,
    .messages-list .highlighted li {
        overflow: hidden;
    }

    .messages-list .highlighted li .email,
    .messages-list .highlighted li .phone {
        cursor: pointer;
    }

Теперь объявляем переменные:

    @list = .messages-list .highlighted;
    @list-item = @list li;

…и получаем:

    @list,
    @list-item {
        overflow: hidden;
    }

    @list-item .email,
    @list-item .phone {
        cursor: pointer;
    }

Кстати говоря, это не единственные мысли на эту тему. Чуть больше месяца назад на [форуме Вебмаскона](http://webmascon.com/forum/) было опубликовано довольно [интересное предложение](http://webmascon.com/forum/viewtopic.php?t=6530) по решению той же проблемы. В нашем случае, часть примера выглядела бы так:

    .messages-list {
        .highlighted {
            li {
                .email,
                .phone {
                    cursor: pointer;
                }
            }
        }
    }

…правда становится не очень ясно, куда, при такой форме записи, вставлять правила для вышестоящих селекторов. Видимо, в отдельных конструкциях. Может и у вас есть свои предложения по оптимизации CSS, не противоречащие духу самого языка?

**PS:** А вот уже черновики возможной спецификации [CSS Variables](http://disruptive-innovations.com/zoo/cssvariables/) и [Symbolic constants](http://www.w3.org/TR/NOTE-CSS-potential#id05684046681).
