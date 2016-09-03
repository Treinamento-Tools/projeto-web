define(['angular'], function(angular) {
    angular.module("shared").factory("$typeFormService", TypeFormService);

    function TypeFormService() {

        this.formulariosRespondidos = null;
        this.questoes = null;

        function Questao(id, type, nome) {
            this.id = id,
            this.type = type;
            this.nome = nome;
        }

        function Grupo(id, nome) {
            this.id = id,
            this.nome = nome;
            this.questions = [];
        }

        function Formulario(token) {
            this.token = token;
            this.respostas = [];
        }

        function Resposta(tipo, idQuestao, valor) {
            this.tipo = tipo;
            this.idQuestao = idQuestao;
            this.valor = valor;
        }

        function agruparRespostas(typeForm) {
            var formulariosRespondidoss = [];
            this.formulariosRespondidos = [];
            var typeFormsRespondidos = typeForm.responses.filter(function(data) {
                return data.completed != "0";
            });

            angular.forEach(typeFormsRespondidos, function(typeFormRespondido) {
                var form = new Formulario(typeFormRespondido.token);

                angular.forEach(typeFormRespondido.answers, function(valor, chave) {
                    var idQuestao = parseInt(chave.substr(-8));
                    var tipo = chave.substr(0, chave.indexOf(idQuestao) - 1);
                    form.respostas.push(new Resposta(tipo, idQuestao, valor));
                });
                formulariosRespondidoss.push(form);
            });
            this.formulariosRespondidos = angular.copy(this.formulariosRespondidos);
            return formulariosRespondidoss;
        }

        function agruparQuestoes(typeForm) {
            var questoes = [];

            carregarGrupos(questoes, typeForm);
            carregarQuestoes(questoes, typeForm);

            this.questoes = angular.copy(questoes);
            return questoes;
        }

        function carregarGrupos(questoes, typeForm) {
            angular.forEach(typeForm.questions, function(typeFormQuestion) {
                if (typeFormQuestion.id.indexOf("group") !== -1) {
                    questoes.push(new Grupo(typeFormQuestion.field_id, typeFormQuestion.question));
                }
            });
        }

        function carregarQuestoes(questoes, typeForm) {
            angular.forEach(typeForm.questions, function(typeFormQuestion) {
                if (typeFormQuestion.id.indexOf("group") == -1) {
                    if (typeFormQuestion.group) {
                        carregarQuestaoComGrupo(questoes, typeFormQuestion);
                    } else {
                        carregarQuestao(questoes, typeFormQuestion);
                    }
                }
            });
        }

        function carregarQuestaoComGrupo(questoes, typeFormQuestion) {
            var indiceGrupo = questoes.map(function(field) {
                return field.id == typeFormQuestion.group.substr(6)
            }).indexOf(true);
            var tipoQuestao = typeFormQuestion.id.substr(0, typeFormQuestion.id.indexOf("_" + typeFormQuestion.field_id));
            questoes[indiceGrupo].questions.push(new Questao(typeFormQuestion.field_id, tipoQuestao, typeFormQuestion.question));
        }

        function carregarQuestao(questoes, typeFormQuestion) {
            var tipoQuestao = typeFormQuestion.id.substr(0, typeFormQuestion.id.indexOf("_" + typeFormQuestion.field_id));
            questoes.push(new Questao(typeFormQuestion.field_id, tipoQuestao, typeFormQuestion.question));
        }

        function getQuestoes() {
            return this.questoes;
        }

        function getformulariosRespondidos() {
            return this.formulariosRespondidos;
        }


        return {
            agruparQuestoes: agruparQuestoes,
            agruparRespostas: agruparRespostas,
            getQuestoes: getQuestoes
        }
    }
});