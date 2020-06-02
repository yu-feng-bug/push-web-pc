<template>
  <div class="wrapper-container list-content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户指南" name="first">
        <div class="sign-table">
          <h2>短信服务</h2>
          <p>
            短信服务（Short Message
            Service）是指通过调用短信发送API，将指定短信内容发送给指定手机用户。用户收到的短信来自
          </p>
          <p>106开头的号码，短信的内容多用于企业向用户传递验证码、系统通知、会员服务等信息</p>
        </div>
        <div class="sign-table">
          <h2>产品功能</h2>
          <h3>短信通知</h3>
          <p>99%到达率，电信级运维保障，实时监控自动切换。大容量高并发，支撑双11期间20亿短信发送，6亿用户触达</p>
        </div>
        <div class="sign-table">
          <h2>短信验证码</h2>
          <p>3秒可达，三网合一专属通道，与工信部携号转网平台实时互联。变量灵活，支持带入变量，内容灵活，可适应支持各业务场景</p>
        </div>
        <div class="sign-table">
          <h2>数据统计</h2>
          <p>可查看请求量、发送成功量、失败量、等统计数据；通过日期、手机号等维度，查看发送详情</p>
        </div>
        <div class="sign-table">
          <h2>应用场景</h2>
          <h3>短信验证码</h3>
          <p>
            APP、网站注册账号，向手机下发验证码；
            登录账户、异地登录时的安全提醒； 找回密码时的安全验证；
            支付认证、身份校验、手机绑定等
          </p>
        </div>
        <div class="sign-table">
          <h2>系统信息推送</h2>
          <p>
            向注册用户下发系统相关信息，包括： 升级或维护、服务开通、价格调整、
            订单确认、物流动态、消费确认、 支付通知等普通通知短信
          </p>
        </div>
        <div class="sign-table">
          <h2>推广短信</h2>
          <p>向注册用户和潜在客户发送通知和推广信息，包括促销活动通知、业务推广、新产品宣讲、会员关怀等商品与活动的推广信息。增加企业</p>
          <p>产品曝光率、提高产品和企业的知名度</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="短信签名" name="second">
        <div class="sign-table">
          <h2>短信签名简介</h2>
          <p>短信签名是短信服务提供的一种快捷、方便的个性化签名方式。当发送短信时，短信平台会根据设置，在短信内容里附加个性签名，再</p>
          <p>发送给指定手机号码</p>
          <p>&nbsp;</p>
          <p>短信签名必须经过审核才能在短信中使用，提交审核时：</p>
          <ul>
            <li>企业用户和个人用户以本账号名义申请签名时，如果不涉及第三方权益，可以不用提交企业相关执照证明。</li>
            <li>个人用户申请事业单位的全称或简称的签名时，必须提交企业相关的执照及授权委托书。</li>
            <li>审核失败的签名可以修改后再次提交。</li>
          </ul>
          <p>&nbsp;</p>
          <h2>适用场景</h2>
          <p>提交签名审核时，需要指定签名的适用场景。</p>
          <p>1. 验证码：用于网站、APP、小程序或公众号尚未上线的场景，不需要上传任何证明文件。</p>
          <p>该场景下可申请验证码类型的短信签名，此签名也只能用于发送验证码短信。网站、APP、小程序或公众号上线后，请及时变更签名为通用类型，以发送多种类型的短信。</p>
          <p>2. 通用：用于验证码短信、短信通知、推广短信、国际/港澳台短信等通用场景。</p>
          <p>该场景下可以申请任何签名来源的短信签名，如果选择APP应用的全称或简称或公众号或小程序的全称或简称，则网站、APP、小程序或公众号必须已上线。</p>
          <u style="color:red">注意：个人用户不支持发送推广短信。</u>
          <p>&nbsp;</p>
          <h2>签名审核时间</h2>
          <p>签名预计2小时内审核完成，审核通过后可使用。</p>
          <p>如涉及政检法等事业单位会在2个工作日内审核完成（如出现多个工作日还未审核，请核实提供的固话是否正确）。</p>
          <p>工作时间:9:00-23:00 （法定节日顺延），建议您尽量在18:00前提交申请。</p>
          <p>&nbsp;</p>
          <h2>审核状态</h2>
          <p>审核中：当前已提交了短信签名，正在排队等待审核，2小时内会审核完毕。</p>
          <p>审核通过：已通过了审核，短信签名和短信模版都通过审核时，就可以通过群发助手或短信服务API开始发送短信。</p>
          <p>审核未通过：由于某些原因，签名审核未能通过。可以通过控制台签名管理来查看具体审核未通过的原因。</p>
          <p>&nbsp;</p>
          <h2>用户签名规范</h2>
          <div style="color:#9093A6">
            <span style="width:200px;display:inline-block;">分类</span>
            <span>规范说明</span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
            <span
              style="height:250px;width:200px;display:inline-block;line-height:250px;text-align: left;float: left;"
            >内容</span>
            <span>
              <ul>
                <li>
                  <p>建议签名内容为短信发送方的真实应用名称、网站名称或公司名称。</p>
                </li>
                <li>
                  <p>短信签名作为短信发送者属性的一种标识，签名必须用于标识公司、产品或业务，禁止发送涉及：色情、赌</p>
                  <p>博、毒品、党政、维权、众筹、慈善募捐、宗教、迷信、股票、移民、面试招聘、博彩、贷款、催款、信用</p>
                  <p>卡提额、投资理财、中奖、抽奖、一元夺宝、一元秒杀、A货、整形、烟酒、交友、暴力、恐吓、皮草、返</p>
                  <p>利、代开发票、代理注册、代办证件、加群、加QQ或者加微信、贩卖个人信息、运营商策反、流量营销等</p>
                  <p>信息的短信。</p>
                </li>
                <li>
                  <p>若签名内容侵犯到第三方权益，必须获得第三方授权。</p>
                </li>
                <li>
                  <p>短信签名必须具有实际意义。不支持含义模糊的中性签名，如“客服通知”、“客户您好”等。</p>
                </li>
              </ul>
            </span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
            <span
              style="height:50px;width:200px;display:inline-block;line-height:50px;text-align: left;float: left;"
            >长度</span>
            <span>
              <ul>
                <li>
                  <p>签名内容要求2~12个字，由中英文或数字组成。其中，中文和英文都作为一个字统计。</p>
                </li>
                <li>
                  <p>支持全英文,不支持空格、符号或全数字。</p>
                </li>
              </ul>
            </span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
            <span
              style="height:50px;width:200px;display:inline-block;line-height:50px;text-align: left;float: left;"
            >格式</span>
            <span>
              <ul>
                <li>
                  <p>请直接填写签名内容，无需添加【】、()、[]等符号。发送短信时，会自动为您的签名增加括号，例如【阿</p>
                  <p>里云】、【弹性云计算】。</p>
                </li>
              </ul>
            </span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="短信模板" name="third">
        <div class="sign-table">
          <h2>短信模版简介</h2>
          <p>短信模版，即具体发送的短信内容。</p>
          <p>短信模版可以支持验证码、短信通知、推广短信三种模式。验证码和短信通知，通过变量替换实现个性短信定制。</p>
          <u style="color:red">推广短信不支持在模版中添加变量</u>
          <p>&nbsp;</p>
          <h2>模版格式</h2>
          <p>短信模板由变量和模板内容构成。模板变量以变量形式提供针对不同手机号码的短信定制方式，在模板中设置变量后，发送短信时指定变量的实际值，</p>
          <p>短信服务会自动用实际值替换模板变量，并发送短信，实现短信的定制化</p>
          <u style="color:red">例如：</u>
          <p>【易恒健康】您正在申请手机注册，验证码为：${param},5分钟内有效！</p>
          <p>其中：</p>
          <p>模版内容为： 您正在申请手机注册，验证码为：${param},5分钟内有效！</p>
          <p>模版变量为：${param}</p>
          <p>短信签名： 【易恒健康】</p>
          <p>&nbsp;</p>
          <h2>模版类型</h2>
          <p>具体分类如下：</p>
          <ul>
            <li>验证码</li>
            <li>短信通知</li>
            <li>推广短信</li>
          </ul>
          <p>&nbsp;</p>
          <h2>模版示例</h2>
          <p>1. 验证码</p>
          <p>【易恒健康】您正在申请手机注册，验证码为：${param}，5分钟内有效！</p>
          <p>2. 短信通知</p>
          <p>【易恒健康】尊敬的${param}，您购买的云小蜜实例：${param}，已于${param}正式到期。如您要继续使用，请于${param}前及时续费或重新购买。</p>
          <p>3. 推广短信</p>
          <p>亲爱的短信服务用户，近期天气渐凉，请注意防寒保暖，及时添加衣物。短信服务与您同行！</p>
          <p>&nbsp;</p>
          <h2>模版规范</h2>
          <p>&nbsp;</p>
          <div style="color:#9093A6">
            <span style="width:200px;display:inline-block;">分类</span>
            <span>规范说明</span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
            <span
              style="height:400px;width:200px;display:inline-block;line-height:400px;text-align: left;float: left;"
            >内容规范</span>
            <span>
              <ul>
                <li>
                  <p>短信模板需明确表述短信发送的实际内容。</p>
                </li>
                <li>
                  <p>所有模板均禁止发送金融相关的所有内容。</p>
                </li>
                <li>
                  <p>
                    不支持发送未经许可的发送行为，主要指邀请注册、邀请成为会员的商业性信息
                    。
                  </p>
                </li>
                <li>
                  <p>禁止发送涉及：色情、赌博、毒品、党政、法律维权、众筹、慈善募捐、宗教、迷信、股票、留学移民、面</p>
                  <p>试招聘、博彩、贷款、催款还款、信用卡提额、投资理财、中奖、抽奖、一元夺宝、一元秒杀、一元云购、</p>
                  <p>二类电商、A货、整形、烟酒、交友、暴力、恐吓、皮草、返现返利、代开发票、运营商禁止发送的信息、</p>
                  <p>代理注册、代办证件、加群、加QQ或者加微信、贩卖个人信息、运营商策反、流量营销、违反广告法用</p>
                  <p>语、殡葬、刷单、空包网、邀请好评、转店类业务等信息的短信。</p>
                </li>
                <li>
                  <p>禁止在关键字或关键信息中出现错别字、变体字、异体字、各类干扰符号等；禁止出现各类非正常混合字以</p>
                  <p>及非常用的表达法。</p>
                </li>
                <li>
                  <p>不支持内容中含有直接或间接访问应用内测分发平台的行为。</p>
                </li>
                <li>
                  <p>地产、留学、招聘、交友、游戏等行业仅支持发送验证码短信。</p>
                </li>
                <li>
                  <p>注意：如出现违法违规或者损害到相关他人权益的，平台将保留最终追究的权利！请各会员严格遵守规范要</p>
                  <p>求，加强自身业务安全，健康发送短信。</p>
                </li>
              </ul>
            </span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
            <span
              style="height:110px;width:200px;display:inline-block;line-height:110px;text-align: left;float: left;"
            >模板格式规范</span>
            <span>
              <ul>
                <li>
                  <p>500字以内。字符串类型，支持中英文、大小写、字符。</p>
                </li>
                <li>
                  <p>注意：</p>
                </li>
                <li>
                  <p>不支持【】，可能会与签名混淆。</p>
                </li>
                <li>
                  <p>暂不支持如★、 ※、 →、 ●等特殊符号，可能会导致短信出现乱码。</p>
                </li>
              </ul>
            </span>
            <p style="height:1px;backgroundColor:#9093A6 ;width:870px;"></p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Documentation",
  data() {
    return {
      activeName: "first"
    };
  },

  created() {},

  mounted() {},

  methods: {
    handleClick(tab, event) {}
  }
};
</script>

<style lang="less" scoped>
.list-content {
  padding: 16px 16px;
  .check-name {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .sign-table {
    margin-top: 26px;
    li {
      color: rgb(67, 72, 76);
      p {
        color: rgb(144, 147, 166);
      }
    }
    p {
      color: rgb(67, 72, 76);
    }
    padding-left: 20px;
  }
  .check-list {
    margin-left: 60px;
  }
  h2 {
    font-weight: 540;
  }
  h3 {
    font-weight: 500;
  }
}
</style>
