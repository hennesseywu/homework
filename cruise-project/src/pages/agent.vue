<template>
  <div class="agent">
    <div class="row-1">
      <div class="col col1">
        <div class="col-font-1-2-left">{{base.building.key}}</div>
        <div class="icon-cog col-1-icon"></div>
        <div class="col-font-1-2-right">{{base.building.value}}</div>
      </div>
      <div class="col col2">
        <div class="col-font-1-2-left">{{base.idle.key}}</div>
        <div class="icon-coffee col-2-icon"></div>
        <div class="col-font-1-2-right">{{base.idle.value}}</div>
      </div>
      <div class="col col3">
        <div class="col-3" v-for="(item,key) in base.type" :key="key">
          <div class="up-text">{{item.key}}</div>
          <div class="down-text">{{item.value}}</div>
        </div>
      </div>
    </div>
    <div class="row-2">
      <div class="tab-row">
        <div class="tab" v-for="(item,key) in base.type" :key="key">
          <span @click="fetchAgentByType(item.key)">{{item.key}}</span>
        </div>
        <el-input prefix-icon="icon-search search-icon" class="search-content">
        </el-input>
        <span class="icon-th-card icon-card "></span>
        <span class="icon-th-list icon-list active"></span>
      </div>
    </div>
    <!-- agent list -->
    <div class="row-2-content">
      <div class="content" v-for="(item,key) in agent" :key="key">
        <img :src="osIcons[item.os]" class="os-icon">
        <div class="info">
          <div class="up">
            <span class="up-icon icon-desktop"></span>
            <span class="up-url">{{item.name}}</span>
            <div :class="item.status+'-icon'">
              <span class="type-icon-span">{{item.status}}</span>
            </div>
            <div class="up-right-text">
              <span class="up-icon-s icon-info"></span>
              <span class="right-text">{{item.ip}}</span>
            </div>
            <div class="up-right-text">
              <span class="up-icon-s icon-folder"></span>
              <span class="right-text">{{item.location}}</span>
            </div>
          </div>
          <div class="down" :ref="'down'+key">
            <!--add Os popover -->
            <el-popover class="pop" placement="bottom-start" width="570" trigger="click" v-model="osAddVisible[key]">
              <div class="pop-header">Separate multiple resource name with commas <span @click="closeOsPop($event,key)"
                  class="icon-close close-icon"></span></div>
              <div class="pop-content">
                <el-input v-model="osNames"></el-input>
              </div>
              <div class="pop-bottom">
                <el-button class="add-button" type="primary" size="mini" @click="addOs(key+'')">Add Resources</el-button>
                <el-button class="cancel-button" size="mini" type="primary" @click="closeOsPop($event,key+'')">Cancel</el-button>
              </div>
              <div slot="reference" class="icon-plus plus" @click="openOsPop(key+'')">
              </div>
            </el-popover>
            <div class="down-delete" :ref="'downDelete'+key" v-for="(resouce,index) in item.resources" :key="index">
              <span class="os-text">{{resouce}}</span>
              <span class="icon-trash trash-icon" @click="deleteOs(key+'',index+'')"></span>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapActions,
    mapState
  } from "vuex";

  import windowsIcon from '../assets/images/osIcons/windows.png';
  import ubuntuIcon from '../assets/images/osIcons/ubuntu.png';
  import debianIcon from '../assets/images/osIcons/debian.png';
  import suseIcon from '../assets/images/osIcons/suse.png';
  import centosIcon from '../assets/images/osIcons/centos.png';

  export default {
    data() {
      return {
        osIcons: { //icon info
          windows: windowsIcon,
          ubuntu: ubuntuIcon,
          debian: debianIcon,
          suse: suseIcon,
          centos: centosIcon
        },
        filterType: "", //search type
        osAddVisible: [], //add pop visible
        osNames: "" //add os input value
      }
    },
    computed: {
      // Exposed attribute
      ...mapState("common", {
        agent: state => state.agent,
        base: state => state.base,
        osVisibleModel: state => state.base
      })
    },
    async created() {
      //fetch data
      this.fetchBase();
      await this.init();
      this.osAddVisible = this.$store.state.common.osVisibleModel;
    },
    mounted() {},
    methods: {
      async init() {
        await this.fetchAgent();
      },
      ...mapActions("common", ["fetchAgent", "fetchBase", "updateOsModelStatus", "addOsNames", "deleteOsName"]), // Exposed request method
      fetchAgentByType(type) {
        if (this.filterType != type) {
          if (type == "All") {
            this.init();
          } else {
            this.filterType = type;
            this.fetchAgent({
              type: this.filterType.toLowerCase()
            });
          }
        }
      },
      openOsPop(key) {
        this.$set(this.osAddVisible, key, true); //update array  re render
      },
      closeOsPop(e, key) {
        this.$set(this.osAddVisible, key, false); //update array  re render
      },
      addOs(key) {
        if (this.osNames != "") {
          let osNamesArray = this.osNames.split(",");
          console.log("osNames", osNamesArray);
          this.addOsNames({
            key,
            osNamesArray
          })
          this.$set(this.osAddVisible, key, false); //update array  re render
          this.osNames = "";
        }
      },
      deleteOs(key, index) {
        this.deleteOsName({
          key,
          index
        })
      }
    }
  }
</script>

<style lang="scss">
  .agent {
    width: 870px;

    .row-1 {
      display: flex;
      margin-bottom: 15px;

      .col {
        display: flex;
        position: relative;
        text-align: center;
        width: 272px;
        height: 117px;
      }

      .col-font-1-2-left {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        margin: 17px 13.5px 0 15px;
      }

      .col-font-1-2-right {
        font-size: 48px;
        color: #ffffff;
        margin: 60px 0 0 20px;
      }


      .col1 {
        background-color: #ffb900;
        margin-left: 0;
      }

      .col-1-icon {
        margin: -13.5px;
        font-size: 144px;
        color: #ffffff;
        opacity: 0.2;
        -webkit-animation: rotateIcon 4s linear infinite;
      }

      .col-2-icon {
        margin: -15px;
        font-size: 144px;
        color: #ffffff;
        opacity: 0.2;
      }

      @-webkit-keyframes rotateIcon {
        0% {
          -webkit-transform: rotate(0deg);
        }

        25% {
          -webkit-transform: rotate(90deg);
        }

        50% {
          -webkit-transform: rotate(180deg);
        }

        75% {
          -webkit-transform: rotate(270deg);
        }

        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      .col2 {
        background-color: #7fbc39;
        margin-left: 30px;
      }

      .col3 {
        background: #ffffff;
        margin-left: 30px;
        text-align: center;

        .col-3 {
          margin: 22px 0 25px 42px;

          .up-text {
            font-size: 12px;
            margin-bottom: 40px;
          }

          .down-text {
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
    }

    .row-2 {
      position: relative;
      background: #ffffff;
      margin-bottom: 15px;

      .active {
        color: #00b4cf;
      }

      .tab-row {
        display: flex;

        .tab {
          width: 100px;
          height: 60px;
          text-align: center;
          border-right: 1px solid #efefef;

          span {
            font-size: 16px;
            line-height: 64px;
          }
        }

        .search-content {
          margin: 10px 0 10px 30px;
          width: 170px;
          font-size: 20px;

          .el-input__inner {
            background-color: #efefef !important;
          }
        }

        .icon-card {
          position: absolute;
          top: 15px;
          right: 60px;
          font-size: 20px;
          line-height: 30px;
        }

        .icon-list {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 20px;
          line-height: 30px;

        }
      }
    }

    .row-2-content {
      .content {
        display: flex;
        width: 100%;
        background: #ffffff;

        .os-icon {
          width: 62px;
          height: 62px;
          margin: 24px 24px;
        }

        .info {
          padding-left: 20px;

          .up {
            display: flex;
            margin-top: 20px;

            .up-icon {
              margin-right: 10px;
              font-size: 20px;
            }

            .up-url {
              color: #00b4cf;
              font-weight: 500;
              margin-right: 30px;
            }

            .idle-icon {
              background-color: #ff9a2a;
              padding: 0 15px;
            }

            .type-icon-span {
              color: #ffffff;
              font-size: 14px;
              line-height: 20px;
            }

            .building-icon {
              background-color: #7fbc39;
              padding: 0 5px;
            }

            .up-right-text {
              margin-left: 40px;

              .up-icon-s {
                font-size: 16px;
                margin-right: 15px;
              }

              .right-text {
                font-size: 16px;
              }
            }
          }

          .down {
            display: flex;
            margin-top: 28px;

            .plus {
              width: 30px;
              height: 27px;
              font-size: 18px;
              text-align: center;
              line-height: 27px;
              color: #ffffff;
              background-color: #00b4cf;
            }

            .down-delete {
              background-color: #efefef;
              margin: 0 10px;
              line-height: 26px;
              padding: 0 10px;
              color: #2d4054;
              font-size: 16px;

              .trash-icon {
                margin-left: 10px;
              }


            }
          }
        }
      }
    }
  }

  .el-popover {
    border-color: #00b4cf !important;

    .popper__arrow {
      border-bottom-color: #00b4cf !important;
    }

    .pop-header {
      margin: 15px;

      .close-icon {
        float: right;
        margin-right: 20px;
        font-size: 20px;
        color: #00b4cf;
      }
    }

    .pop-content {
      margin: 15px;

      .el-input .el-input__inner {
        color: #00b4cf !important;

        &:focus {
          border-color: #00b4cf !important
        }
      }
    }

    .pop-bottom {
      margin: 15px;

      .add-button {
        border-color: #00b4cf !important;
        background-color: #00b4cf !important;
      }

      .cancel-button {
        border-color: #2d4054 !important;
        background-color: #2d4054 !important;
      }
    }
  }
</style>