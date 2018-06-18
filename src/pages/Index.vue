<template>
    <div class="index">
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                  <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                  </button>
                  <router-link to="" class="navbar-brand ">www.shalao3.com</router-link>
                </div>
                <div class="navbar-collapse collapse" role="navigation">
                    <ul class="nav navbar-nav">
                        <li class=" hidden-md">
                            <router-link to="">数据结构&算法</router-link>
                        </li>
                        <li class=" hidden-md">
                            <router-link to="">Laravel</router-link>
                        </li>
                        <li><router-link to="">Python</router-link></li>
                        <li><router-link to="">JavaScript设计模式</router-link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right ">
                        <li><a href="/about/" onclick="_hmt.push(['_trackEvent', 'navbar', 'click', 'about'])">关于</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    };
</script>

<style scoped>
</style>