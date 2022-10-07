<template>
  <div class="container">
    <h1 class="titulo" >Detalhar Senha</h1>
    <div class="field">
      <div class="control">
        <i>Id: {{password.id}}</i>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <i>Descrição: {{password.description}}</i>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <i>URL: {{password.url}}</i>
      </div>
    </div>

    <div class="botoes-form">
      <router-link class="link-voltar" to="/senhas">
        <button class="button btn-voltar">Voltar</button>
      </router-link>
      <button @click="onClickEditPage(password.id)" class="button is-link btn-editar">Editar</button>
      <button @click="onClickDelete()" class="button is-danger btn-desativar">Deletar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { PasswordClient } from '@/client/password-client'
import { Password } from '@/model/password.model'
import { Notification } from '@/model/notification.model'

export default class DetailView extends Vue {
  private passwordClient!: PasswordClient
  private password : Password = new Password()
  @Prop({type: Number, required: false})
  private readonly id!: number
  private notification : Notification = new Notification()

  public mounted(): void {
    this.passwordClient = new PasswordClient()
    this.getPassword()
  }
  private getPassword(): void {
    this.passwordClient.findById(this.id)
        .then(
            sucess => {
              this.password = sucess
            },
            error => console.log(error)
        )
  }
  private onClickEditPage(idPassword: number){
    this.$router.push({ name: 'edit-password', params: { id: idPassword} })
  }

  private onClickDelete(): void {
    var conf = confirm("Tem certeza que deseja deletar a senha " + this.password.url + "?")
    if (conf) {
      this.passwordClient.delete(this.password)
          .then(
              success => {
                this.notification = this.notification.new(true, 'notification is-success', 'Senha removida com sucesso!')
              }, error => {
                this.notification = this.notification.new(true, 'notification is-danger', 'Erro ao remover a senha: ' + error)
              }
          )
      this.$router.push({ name: 'passwords' })
    }
  }

}
</script>
<style lang="scss">
@import "~bulma/bulma.sass";
.container{
  margin-left: 30px;
  width: 80%;
}
.titulo{
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.botoes-form{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  margin-block-end: 20px;
}
.btn-editar{
  background-color: blue;
  width: 30%;
}
.link-voltar{
  width: 30%;
}
.btn-voltar{
  background-color: dimgrey;
  width: 100%;
}
.btn-desativar{
  background-color: red;
  color: white;
  width: 30%;
}
</style>