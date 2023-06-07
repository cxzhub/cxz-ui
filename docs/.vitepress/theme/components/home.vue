<template>
  <section id="hero">
    <h1 class="tagline">
      <span class="accent">实用性强</span>
      <br />
      Vue3组件库
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

    <p>
      <el-button type="primary" size="large" round @click="handleStartClick">
        快速上手
        <el-icon>
          <Right />
        </el-icon>
      </el-button>
      <el-button size="large" round @click="handleGitHubClick">
        在 GitHub 上查看
      </el-button>
    </p>
  </section>

  <section id="highlights" class="vt-box-container">
    <div class="vt-box">
      <h2>源于工作</h2>
      <p>这些组件或多或少都是在工作中碰到过的，具有实际意义。</p>
    </div>
    <div class="vt-box">
      <h2>专注痛点</h2>
      <p>
        这些组件的功能在现有的一些组件库里没有，碰到相关的需求处理起来较棘手。
      </p>
    </div>
    <div class="vt-box">
      <h2>宁缺毋滥</h2>
      <p>不重复造轮子，从实际出发，宁缺毋滥。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'

const handleStartClick = () => {
  window.location.href = '/guide/start.html'
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

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

.vt-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.vt-box-container .vt-box {
  transition: color 0.5s, background-color 0.5s;
  padding: 28px 36px;
  border-radius: 8px;
  flex: 0 32%;
  font-size: 14px;
  font-weight: 500;
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

  #highlights h3 {
    margin-bottom: 0.6em;
  }

  #highlights .vt-box {
    padding: 20px 36px;
  }

  .actions a {
    margin: 18px 0;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
