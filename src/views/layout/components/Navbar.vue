<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>

    <div class="right-menu">
     <error-log class="errLog-container right-menu-item"></error-log>
      <div class="titleDiv right-menu-item">
        <span class="title">欢迎您：{{managerName}}</span>
      </div>

      <!--<nx-github style="margin-top:2px" class="nx-help right-menu-item"></nx-github>
       <error-log class="errLog-container right-menu-item"></error-log>
      <nx-help class="nx-help right-menu-item" />-->
      <nx-top-lock style="cursor:pointer" class="nx-help"></nx-top-lock>
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item"></nx-full-screen>
      </el-tooltip>

      <!-- <lang-select class="international right-menu-item"></lang-select> -->
      <nx-lang-select class="international right-menu-item"></nx-lang-select>

      <!--<el-tooltip effect="dark" content="主题" placement="bottom">-->
        <!-- <theme-picker class="theme-switch right-menu-item"></theme-picker> -->
        <!--<nx-skin class="theme-switch right-menu-item"></nx-skin>-->
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="../../../assets/images/home/index_logo.png">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              系统首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/infoManage/ChangePassword">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorLog from '@/components/ErrorLog'
import nxTopLock from '@/components/nx-top-lock'
import nxBreadcrumb from '@/components/nx-breadcrumb'
import nxHamburger from '@/components/nx-hamburger'
import nxHelp from '@/components/nx-help/index'
import nxFullScreen from '@/components/nx-full-screen/index'
import nxLangSelect from '@/components/nx-lang-select/index'
import nxSkin from '@/components/nx-skin/index'
import nxGithub from '@/components/nx-github/index'
export default {
  name: 'navBar',
  components: {
    nxBreadcrumb,
    nxHamburger,
    nxHelp,
    nxFullScreen,
    nxLangSelect,
    nxSkin,
    nxTopLock,
    nxGithub,
    ErrorLog
  },
  data(){
    return{
      managerName:'',
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    getManagerName(){
      this.$store.dispatch('GetInfo').then(res=>{
            this.managerName=res.managerName;
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  },
  mounted(){
    this.getManagerName();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 43px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }

    .titleDiv{
      padding-top: 0;
      margin-top: 0!important;
      position: relative;
      height: 50px;
      vertical-align:top;
      .title{
        padding: 0;
        line-height: 50px;
        font-size:14px;
      text-align: center;
      }
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          /*width: 40px;*/
          /*height: 40px;*/
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
