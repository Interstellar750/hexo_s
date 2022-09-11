<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="author" content="Hubert Chen">





<title>欢迎参观 | Hubert&#39;s Blog</title>



    <link rel="icon" href="/favicon.ico">




    <!-- stylesheets list from _config.yml -->
    
    <link rel="stylesheet" href="/css/style.css">
    



    <!-- scripts list from _config.yml -->
    
    <script src="/js/script.js"></script>
    
    <script src="/js/tocbot.min.js"></script>
    




<meta name="generator" content="Hexo 6.2.0"></head>

<body>
    <script>
        // this function is used to check current theme before page loaded.
        (() => {
            const currentTheme = window.localStorage && window.localStorage.getItem('theme') || '';
            const isDark = currentTheme === 'dark';
            const pagebody = document.getElementsByTagName('body')[0]
            if (isDark) {
                pagebody.classList.add('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Dark"
            } else {
                pagebody.classList.remove('dark-theme');
                // mobile
                document.getElementById("mobile-toggle-theme").innerText = "· Light"
            }
        })();
    </script>

    <div class="wrapper">
        <header>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-header header-logo"><a href="/">Hubert&#39;s Blog</a></div>
            <div class="menu navbar-right">
                
                    <a class="menu-item" href="/archives">文章</a>
                
                    <a class="menu-item" href="/tag">标签</a>
                
                    <a class="menu-item" href="/about">关于</a>
                
                <input id="switch_default" type="checkbox" class="switch_default">
                <label for="switch_default" class="toggleBtn"></label>
            </div>
        </div>
    </nav>

    
    <nav class="navbar-mobile" id="nav-mobile">
        <div class="container">
            <div class="navbar-header">
                <div>
                    <a href="/">Hubert&#39;s Blog</a><a id="mobile-toggle-theme">·&nbsp;Light</a>
                </div>
                <div class="menu-toggle" onclick="mobileBtn()">&#9776; 菜单</div>
            </div>
            <div class="menu" id="mobile-menu">
                
                    <a class="menu-item" href="/archives">文章</a>
                
                    <a class="menu-item" href="/tag">标签</a>
                
                    <a class="menu-item" href="/about">关于</a>
                
            </div>
        </div>
    </nav>

</header>
<script>
    var mobileBtn = function f() {
        var toggleMenu = document.getElementsByClassName("menu-toggle")[0];
        var mobileMenu = document.getElementById("mobile-menu");
        if(toggleMenu.classList.contains("active")){
           toggleMenu.classList.remove("active")
            mobileMenu.classList.remove("active")
        }else{
            toggleMenu.classList.add("active")
            mobileMenu.classList.add("active")
        }
    }
</script>
            <div class="main">
                <div class="container">
    
    
        <div class="post-toc">
    <div class="tocbot-list">
    </div>
    <div class="tocbot-list-menu">
        <a class="tocbot-toc-expand" onclick="expand_toc()">展开全部</a>
        <a onclick="go_top()">回到顶端</a>
        <a onclick="go_bottom()">查看底部</a>
    </div>
</div>

<script>
    var tocbot_timer;
    var DEPTH_MAX = 6;    // 为 6 时展开所有
    var tocbot_default_config = {
        tocSelector: '.tocbot-list',
        contentSelector: '.post-content',
        headingSelector: 'h1, h2, h3',
        orderedList: false,
        scrollSmooth: true,
        onClick: extend_click,
    };

    function extend_click() {
        clearTimeout(tocbot_timer);
        tocbot_timer = setTimeout(function () {
            tocbot.refresh(obj_merge(tocbot_default_config, { hasInnerContainers: true }));
        }, 420); // 这个值是由 tocbot 源码里定义的 scrollSmoothDuration 得来的
    }

    document.ready(function () {
        tocbot.init(obj_merge(tocbot_default_config, { collapseDepth: 1 }));
    });

    function expandToc() {
        var b = document.querySelector('.tocbot-toc-expand');
        var expanded = b.getAttribute('data-expanded');
        expanded ? b.removeAttribute('data-expanded') : b.setAttribute('data-expanded', true);
        tocbot.refresh(obj_merge(tocbot_default_config, { collapseDepth: expanded ? 1 : DEPTH_MAX }));
        b.innerText = expanded ? 'Expand all' : 'Collapse all';
    }

    function go_top() {
        window.scrollTo(0, 0);
    }

    function go_bottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    function obj_merge(target, source) {
        for (var item in source) {
            if (source.hasOwnProperty(item)) {
                target[item] = source[item];
            }
        }
        return target;
    }
</script>
    

    
    <article class="post-wrap">
        <header class="post-header">
            <h1 class="post-title">欢迎参观</h1>
            
                <div class="post-meta">
                    

                    
                        <span class="post-time">
                        日期: <a href="#">01 三月, 2022&nbsp;&nbsp;11:42:55</a>
                        </span>
                    
                    
                </div>
            
        </header>

        <div class="post-content">
            <h2 id="你好，欢迎来到我的博客"><a href="#你好，欢迎来到我的博客" class="headerlink" title="你好，欢迎来到我的博客"></a>你好，欢迎来到我的博客</h2><p>这个博客由我创建于2022年01月24日，起初是想跟网络上的大佬一样搭个自己的博客，不过现在搭好了也不知道写些什么。</p>
<h2 id="关于我-Hubert-Chen"><a href="#关于我-Hubert-Chen" class="headerlink" title="关于我 (Hubert Chen)"></a>关于我 (Hubert Chen)</h2><h3 id="兴趣爱好"><a href="#兴趣爱好" class="headerlink" title="兴趣爱好"></a>兴趣爱好</h3><p>给手机刷系统，例如 <a target="_blank" rel="noopener" href="https://lineageos.org/">Lineage OS</a> <a target="_blank" rel="noopener" href="https://sailfishos.org/">Sailfish OS</a><br>会些基础的Linux操作<del>，不过十分容易碰见bug</del><br>会画画 (非常非常基础，目前只会描些图)<br>听音乐使用的软件： <a target="_blank" rel="noopener" href="https://spotify.com/">Spotify</a>  <a target="_blank" rel="noopener" href="https://music.163.com/">网易云音乐</a> 偶尔会在网易云音乐里上传一些歌词<br>玩游戏会用的软件： <a target="_blank" rel="noopener" href="https://store.steampowered.com/">Steam</a> <a target="_blank" rel="noopener" href="https://www.ubisoft.com/">Ubisoft</a> <a target="_blank" rel="noopener" href="https://www.xbox.com/">Xbox(云游戏)</a><br>活跃的社交平台：<a target="_blank" rel="noopener" href="https://t.me/trle5">Telegram</a> <a target="_blank" rel="noopener" href="https://twitter.com/interstellar750">Twitter</a> <a target="_blank" rel="noopener" href="https://github.com/Interstellar750/">GitHub</a> <a target="_blank" rel="noopener" href="https://matrix.io/#/@trle5:matrix.org">Matrix</a> 国内的QQ微信也在用，但并不太喜欢，而且放出来可能会泄露个人信息，所以就不公开了</p>
<h2 id="建站历程："><a href="#建站历程：" class="headerlink" title="建站历程："></a>建站历程：</h2><h3 id="2022-x2F-01-x2F-24"><a href="#2022-x2F-01-x2F-24" class="headerlink" title="2022&#x2F;01&#x2F;24"></a>2022&#x2F;01&#x2F;24</h3><p>初次建立并使用 <a target="_blank" rel="noopener" href="https://github.io/">GitHub Pages</a> 来作为服务器 （其实并不是第一次，前前后后试了好几次，因为碰到了好多bug）</p>
<h3 id="2022-x2F-01-x2F-29"><a href="#2022-x2F-01-x2F-29" class="headerlink" title="2022&#x2F;01&#x2F;29"></a>2022&#x2F;01&#x2F;29</h3><p>在 <a href="freenom.com">Freenom</a> 上申请了12个月的免费域名 trle5.tk ，但由于不会设置DNS解析，依然用着 <a target="_blank" rel="noopener" href="https://github.io/">GitHub Pages</a> 的默认域名</p>
<h3 id="2022-x2F-02-x2F-26"><a href="#2022-x2F-02-x2F-26" class="headerlink" title="2022&#x2F;02&#x2F;26"></a>2022&#x2F;02&#x2F;26</h3><p>由于 x10m2 上的 <a target="_blank" rel="noopener" href="https://sailfishos.org/">Sailfish OS</a> 因为未知问题操作很卡，把 hexo 后端备份出来迁移到了s10e，使用 <a target="_blank" rel="noopener" href="https://play.google.com/store/apps/details?id=com.termux">Termux</a> 来继续运维</p>
<h3 id="2022-x2F-02-x2F-27"><a href="#2022-x2F-02-x2F-27" class="headerlink" title="2022&#x2F;02&#x2F;27"></a>2022&#x2F;02&#x2F;27</h3><p>将域名 DNS 解析托管到 <a href="godaddy.com">GoDaddy</a> ，成功用上了自定义域名</p>
<h3 id="2022-x2F-03-x2F-08"><a href="#2022-x2F-03-x2F-08" class="headerlink" title="2022&#x2F;03&#x2F;08"></a>2022&#x2F;03&#x2F;08</h3><p>在 <a target="_blank" rel="noopener" href="https://reg.ru/">reg.ru</a> 购买了一年的 <a target="_blank" rel="noopener" href="https://trle5.xyz/">trle5.xyz</a> 域名，用于存放文件，本站可能有一些图片文件会储存在里面</p>
<h3 id="2022-x2F-03-x2F-14"><a href="#2022-x2F-03-x2F-14" class="headerlink" title="2022&#x2F;03&#x2F;14"></a>2022&#x2F;03&#x2F;14</h3><p>更换为由 <a href="freenom.com">Freenom</a> 提供的 DNS 解析</p>
<h3 id="2022-x2F-03-x2F-15"><a href="#2022-x2F-03-x2F-15" class="headerlink" title="2022&#x2F;03&#x2F;15"></a>2022&#x2F;03&#x2F;15</h3><p>把 blackbox 的域名从 <a target="_blank" rel="noopener" href="https://trle5.xyz/">trle5.xyz</a> 迁移到 <a target="_blank" rel="noopener" href="https://t5d.trle5.tk/">t5d.trle5.tk</a></p>
<h3 id="2022-x2F-05-x2F-07"><a href="#2022-x2F-05-x2F-07" class="headerlink" title="2022&#x2F;05&#x2F;07"></a>2022&#x2F;05&#x2F;07</h3><p>从默认的 Landscape 主题更换为 <a target="_blank" rel="noopener" href="https://github.com/Siricee">Siricee</a> 制作的 <a target="_blank" rel="noopener" href="https://github.com/Siricee/hexo-theme-Chic">Chic</a> 主题</p>
<h3 id="2022-x2F-05-x2F-08"><a href="#2022-x2F-05-x2F-08" class="headerlink" title="2022&#x2F;05&#x2F;08"></a>2022&#x2F;05&#x2F;08</h3><p>使用 <a target="_blank" rel="noopener" href="https://vercel.com/">Vercel</a> 建立了博客镜像站，使用域名 <a target="_blank" rel="noopener" href="https://trle5.xyz/">trle5.xyz</a> ，DNS 解析由 <a target="_blank" rel="noopener" href="https://cloudflare.com/">Cloudflare</a> 提供</p>
<h3 id="2022-x2F-06-x2F-01"><a href="#2022-x2F-06-x2F-01" class="headerlink" title="2022&#x2F;06&#x2F;01"></a>2022&#x2F;06&#x2F;01</h3><p>重新配置了博客主题，因为 05&#x2F;15 那天手机数据丢失让博客后端也部分丢失了 （真的丢了好多东西啊😢）</p>
<h3 id="2022-x2F-07-x2F-19"><a href="#2022-x2F-07-x2F-19" class="headerlink" title="2022&#x2F;07&#x2F;19"></a>2022&#x2F;07&#x2F;19</h3><p>重新修正了一篇文章，之前写的文章发现达不到所想的方案所以就暂搁了 <del><strong>懒</strong></del> ，由于之前的丢数据问题，Cloudflare 账号也登不上了，找回有点麻烦</p>
<h3 id="2022-x2F-09-x2F-11"><a href="#2022-x2F-09-x2F-11" class="headerlink" title="2022&#x2F;09&#x2F;11"></a>2022&#x2F;09&#x2F;11</h3><p>给 Cloudflare 客服发邮件，成功拿回了账号的控制权，目前 <a target="_blank" rel="noopener" href="https://trle5.xyz/">trle5.xyz</a> 站点会随时更新，就是代表上面可能会有一些没写完的文章和新东西，文章写完后再推送至 <a href="https://trle5.tk/">trle5.tk</a>，于 6 月 4 日在 <a target="_blank" rel="noopener" href="https://porkbun.com/">Porkbun</a> 白嫖的 <a target="_blank" rel="noopener" href="https://trle5.dev/">trle5.dev</a> 域名还没打算好用来干嘛，两个付费域名以我现在的经济能力压力有点大</p>

        </div>

        
        <section class="post-tags">
            <div>
                <span>标签:</span>
                <span class="tag">
                    
                </span>
            </div>
            <div>
                <a href="javascript:window.history.back();">返回</a>
                <span>· </span>
                <a href="/">主页</a>
            </div>
        </section>
        <section class="post-nav">
            
                <a class="prev" rel="prev" href="/2022/03/05/05.%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E8%87%AA%E5%B7%B1%E7%9A%84%E5%8D%9A%E5%AE%A2/">搭建一个自己的博客</a>
            
            
            <a class="next" rel="next" href="/2022/01/26/03.testagain/">testagain</a>
            
        </section>


    </article>
</div>

            </div>
            <footer id="footer" class="footer">
    <div class="copyright">
        <span>Hubert Chen © 2022 | Powered by <a href="https://hexo.io" target="_blank">Hexo</a> & <a href="https://github.com/Siricee/hexo-theme-Chic" target="_blank">Chic</a></span>
    </div>
</footer>

    </div>
</body>

</html>