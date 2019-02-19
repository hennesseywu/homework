<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <img class="logo" src="../assets/images/logo/logo.svg">
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="logout">sign out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside class="menu-expanded">
        <!--nav-->
        <el-menu :default-active="$route.path" :default-openeds="['2']" class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose" @select="handleselect" unique-opened router>
          <template>
            <div v-for="(item,index)  in $router.options.routes" :key="index">
              <div v-if="!item.hidden">
                <!--multi nodes -->
                <el-submenu :index="index+''" v-if="!item.leaf">
                  <template slot="title">
                    {{item.name}}
                  </template>
                  <div v-for="(child,idx) in item.children" :index="idx" :key="idx">
                    <el-menu-item v-if="!child.hidden">
                      <span :class="child.iconCls"></span>
                      <span class="navigator"> {{child.name}}</span>
                    </el-menu-item>
                  </div>
                </el-submenu>
              </div>
              <!-- one node -->
              <el-menu-item v-if="item.leaf&&item.children.length>0" :key="index" :index="item.children[0].path">
                <span :class="item.children[0].iconCls+' iconCls'"></span>
                <span class="navigator">{{item.children[0].name}}</span>
              </el-menu-item>
            </div>
            <!-- bottom-link -->
            <el-menu-item class="menu-bottom" index="menu-bottom">
              <span class="history">History</span>
              <li class="down-delete" v-for="(his,key) in history" :key="key">
                {{his}}
              </li>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
    <el-col :span="24" class="footer">
      © Copyright 2019 ThoughtWorks, Inc.
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        history: [
          "·  bjstdmngbdr02/acceptance_test",
          "·  bjstdmngbdr03/acceptance_test",
          "·  bjstdmngbdr04/acceptance_test",
          "·  bjstdmngbdr05/acceptance_test",
          "·  bjstdmngbdr06/acceptance_test",
          "·  bjstdmngbdr07/acceptance_test",
        ]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleOpen() {
        console.log('handleopen');
      },
      handleClose() {
        console.log('handleclose');
      },
      handleselect() {},
      //退出登录
      logout() {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {});
      },


    },
    mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }

    }
  }
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .header {
      height: 60px;
      line-height: 60px;
      color: #fff;
      text-align: center;

      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;

        .userinfo-inner {
          cursor: pointer;
          color: #fff;

          img {
            width: 30px;
            height: 30px;
            border-radius: 30px;
            margin: 15px 0px 15px 15px;
            float: right;
          }
        }
      }

      .logo {
        height: 60%;
      }

      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }

    .main {
      display: flex;
      background: #f3f3f3;
      position: absolute;
      top: 60px;
      bottom: 28px;
      overflow: hidden;

      aside {
        background: #2d4054;
        flex: 0 0 270px;
        width: 270px;
        margin-left: 135px;

        .el-menu {
          height: 100%;
          background-color: #2d4054;

          .el-menu-item {
            color: #fff !important;

            .iconCls {
              font-size: 20px;
            }

            &:focus {
              color: #00b4cf !important;
              background-color: #435466 !important;
            }

            &:hover {
              color: #00b4cf !important;
              background-color: #435466 !important;
            }

            &:active {
              color: #00b4cf !important;
            }
          }

          .navigator {
            margin-left: 20px;
          }
        }

        .menu-bottom {
          position: absolute;
          bottom: 300px;

          .history {
            font-size: 24px;
            color: #ccc;
          }

          .down-delete {
            font-size: 12px;
            color: #999;
            line-height: 20px;

            &:hover {
              color: #00b4cf;
            }

            &:active {
              color: #00b4cf;
            }

          }
        }
      }

      .menu-expanded {
        flex: 0 0 270px;
        width: 270px;
      }

      .content-container {
        flex: 1;
        overflow-y: scroll;
        padding: 20px;

        .breadcrumb-container {

          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }

          .breadcrumb-inner {
            float: right;
          }
        }

        .content-wrapper {
          // background-color: #fff;
          box-sizing: border-box;
        }
      }
    }

    .footer {
      position: absolute;
      bottom: 0px;
      text-align: center;
      line-height: 28px;
    }
  }
</style>