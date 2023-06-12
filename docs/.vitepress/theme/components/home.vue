<template>
  <section id="hero">
    <h1 class="tagline">
      <span class="accent">Cxz UI</span>
      <br />
      一个Vue3组件库
    </h1>

    <p class="description">
      源于工作、专注痛点、宁缺毋滥， 基于
      <el-link
        target="_blank"
        href="https://element-plus.org/zh-CN/guide/design.html"
        type="primary"
      >
        Element Plus
      </el-link>
      封装的组件库
    </p>

    <div>
      <el-button type="primary" size="large" round @click="handleStartClick">
        快速上手
        <el-icon>
          <Right />
        </el-icon>
      </el-button>
      <el-button size="large" round @click="handleGitHubClick">
        在 GitHub 上查看
      </el-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'

const handleStartClick = () => {
  window.location.href = '/cxz-ui/guide/start.html'
}

const handleGitHubClick = () => {
  window.open('https://github.com/cxzhub/cxz-ui', '_blank')
}
</script>

<style lang="scss" scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: rgb(60 60 60 / 70%);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;

  .el-link {
    font-size: 22px;
  }
}
.dark .description{
  color: rgba(235, 235, 235, .6);
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }

  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 56px 32px;
  }

  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
