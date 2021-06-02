# Hexo 部屬與版控流程

<https://hexo.io/zh-tw/>

## Basic

參考： <https://raychiutw.github.io/2019/Static-Site-Generator-Comparison/>

參考： <https://stackshare.io/stackups/hexo-vs-hugo-vs-jekyll/>

Hexo 是一種基於 Node.js 所開發的靜態網站生成器，相較於 Jekyll (RubyGem) 、Hugo (Golong)，解析引擎也只是解析模板語言，應該差異不大，主要差別應該是較多的 "中文" 社群、套件資源，再來是通常都要藉由 Cmd 操作，而不是普通人能直接接受的 Gui 操作，所以此專案只是解決一些靜態網站需求所生的簡易使用 Hexo Demo。

## 環境需求

Hexo version 5.0+

Minimum Node.js version 10.13.0

## Command

安裝

> npm install -g hexo-cli

開新專案

> hexo init <folder>
>
> cd <folder>
>
> npm install

新增文章

> hexo new [layout] <title>

## Other

上述大概就是簡易使用時會用到的指令，其餘功能網路上資源蠻多的。