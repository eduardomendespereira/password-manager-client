<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Senhas
    </div>
  </div>

  <hr />
    <div class="buttons-list">
      <router-link class="link-cad" to="/senhas/cadastrar">
        <button class="button btn-cadastrar" style="background-color: green; color: white">Inserir Senha</button>
      </router-link>
      <div>
        <input class="find-password" type="text" v-model="passwordFetched.description" placeholder="Digite a descrição da senha">
        <button class="button is-link" @click="onClickFindByDescription()">Buscar</button>
      </div>
    </div>
  <hr />

  <table class="table table is-fullwidth">
    <thead class="green">
    <tr style="background-color: darkgreen">
      <th style="color: #fff;">ID</th>
      <th style="color: #fff;">Ativo</th>
      <th style="color: #fff;">Descrição</th>
      <th style="color: #fff;">Url</th>
      <th style="color: #fff;">Senha</th>
      <th style="color: #fff;">Opções</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in passwordList" :key="item.id">
      <th>{{ item.id }}</th>

      <th>
        <span v-if="!item.inactive" class="tag is-success"> Ativa </span>
        <span v-if="item.inactive" class="tag is-danger"> Inativa </span>
      </th>

      <th>{{ item.description }}</th>
      <th>{{ item.url }}</th>
      <th>{{ item.password }}</th>
      <th>
        <button @click="onClickDetailPage(item.id)" style="background-color: dodgerblue; color: white" class="button btn-detalhar">Detalhar</button>
      </th>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { PageRequest } from '@/model/page/page-request'
import { PageResponse } from '@/model/page/page-response'
import { Password } from '@/model/password.model'
import { PasswordClient } from '@/client/password-client'
import { AuthUtils } from '@/utils/auth-utils';

export default class PasswordListView extends Vue {
  private pageRequest: PageRequest = new PageRequest()
  private pageResponse: PageResponse<Password> = new PageResponse()
  private passwordList: Password[] = []
  private passwordClient!: PasswordClient
  private authUtils: AuthUtils = new AuthUtils()
  private passwordFetched : Password = new Password()

  public mounted(): void {
    this.redirectPage()
    this.passwordClient = new PasswordClient()
    this.listPasswords()
    console.log(this.passwordFetched)
  }
  private listPasswords(): void {
    this.passwordClient.findByAll(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.passwordList = this.pageResponse.content
            },
            error => console.log(error)
        )
  }

  private onClickFindByDescription() {
     this.passwordClient.findByDescription(this.passwordFetched.description)
         .then(
             success => {
               this.passwordFetched = success
               var results = confirm("Id: " + success.id + "  " + "Descrição: " + success.description + "  " +
                   + "URL: " + success.url + "  " + "Usuário: " + success.user.username + "  "
                   + "Senha: " + success.password)
             }, error => console.log(error)
         )
  }

  public redirectPage(): void {
    var authenticated = this.authUtils.checkAuthenticated()
    if (!authenticated) {
      this.$router.push({ name: 'login' })
    }
  }

  private onClickDetailPage(id: number){
    this.$router.push({ name: 'detail-password', params: { id: id} })
  }
}
</script>

<style lang="scss">
.buttons-list{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.find-password{
  border-radius: 5px;
  width: 300px;
  height: 40px;
  padding: 10px
}
</style>