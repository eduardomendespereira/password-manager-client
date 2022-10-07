<template>
  <div class="container">
    <div class="columns" v-if="notification.ativo">
      <div class="column is-12">
        <div :class="notification.classe">
          <button @click="onClickCloseNotification()"></button>
          {{ notification.mensagem }}
        </div>
      </div>
    </div>

    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Usuario" v-model="user.username">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Senha" v-model="user.password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <div class="buttons">
        <button class="button is-success" @click="onClickLogin()">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {Notification} from '@/model/notification.model'
import {User} from '@/model/user.model';
import {UserClient} from '@/client/user.client';
import {setCookie, getCookie, removeCookie} from "typescript-cookie";
import {AuthUtils} from '@/utils/auth-utils';

export default class LoginView extends Vue {
  private notification: Notification = new Notification()
  private userClient!: UserClient
  private user: User = new User()
  private authUtils: AuthUtils = new AuthUtils()

  public mounted(): void {
    this.redirectPage()
    this.userClient = new UserClient()
  }

  public redirectPage(): void {
    var authenticated = this.authUtils.checkAuthenticated()
    if (authenticated) {
      this.$router.push({name: 'passwords'})
    }
  }

  private onClickCloseNotification(): void {
    this.notification = new Notification()
  }

  private onClickLogin(): void {
    this.userClient.login(this.user)
        .then(
            success => {
              this.user = success.data
              this.notification = this.notification.new(true, 'notification is-success', 'Login efetuado com sucesso!')
              this.saveCredentials()
            }, error => {
              this.notification = this.notification.new(true, 'notification is-danger', 'Erro - dados inválidos')
              this.onClickClean()
            }
        )
  }

  private onClickRegister(): void {
    this.$router.push({name: 'user-register'})
  }

  private onClickClean(): void {
    this.user = new User()
  }

  private saveCredentials(): void {
    removeCookie("access")
    setCookie("access", this.user.id, {expires: 1})
    this.$router.push({name: 'password'})
  }
}
</script>

<style scoped>
.container-main {
  width: 60%;
}

</style>