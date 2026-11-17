import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoOriginal, setPrecoOriginal] = useState('');
  const [percentual, setPercentual] = useState('');

  const [economia, setEconomia] = useState(null);
  const [precoFinal, setPrecoFinal] = useState(null);
  const [erro, setErro] = useState('');

  // FORMATAR VALORES EM REAIS
  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // APLICAR DESCONTO
  function aplicarDesconto() {
    setErro('');
    setEconomia(null);
    setPrecoFinal(null);

    // VALIDAR NOME
    if (nomeProduto.trim() === '') {
      setErro('Informe o nome do produto.');
      return;
    }

    // VALIDAR PREÇO
    if (precoOriginal.trim() === '') {
      setErro('Informe o preço original do produto.');
      return;
    }

    const preco = Number(precoOriginal.replace(',', '.'));

    if (!Number.isFinite(preco) || preco < 0) {
      setErro('O preço deve ser um número maior ou igual a zero.');
      return;
    }

    // VALIDAR PERCENTUAL
    if (percentual.trim() === '') {
      setErro('Informe o percentual de desconto.');
      return;
    }

    const desconto = Number(percentual.replace(',', '.'));

    if (
      !Number.isFinite(desconto) ||
      desconto < 0 ||
      desconto > 100
    ) {
      setErro('O desconto deve estar entre 0% e 100%.');
      return;
    }

    // CALCULAR DESCONTO
    const valorEconomizado = preco * (desconto / 100);

    const valorFinal = preco - valorEconomizado;

    // ATUALIZAR RESULTADO
    setEconomia(valorEconomizado);
    setPrecoFinal(valorFinal);
  }

  // LIMPAR CAMPOS
  function limparCampos() {
    setNomeProduto('');
    setPrecoOriginal('');
    setPercentual('');
    setEconomia(null);
    setPrecoFinal(null);
    setErro('');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        backgroundColor="#f1f5f9"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.container}>

            {/* CABEÇALHO */}

            <View style={styles.header}>
              <Text style={styles.icone}>🛍️</Text>

              <Text style={styles.titulo}>
                Calculadora de Descontos
              </Text>

              <Text style={styles.subtitulo}>
                Descubra quanto você economiza em suas compras.
              </Text>
            </View>

            {/* NOME DO PRODUTO */}

            <Text style={styles.label}>
              Nome do produto
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: Tênis esportivo"
              value={nomeProduto}
              onChangeText={setNomeProduto}
              autoCapitalize="sentences"
            />

            {/* PREÇO ORIGINAL */}

            <Text style={styles.label}>
              Preço original (R$)
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: 200,00"
              value={precoOriginal}
              onChangeText={setPrecoOriginal}
              keyboardType="decimal-pad"
            />

            {/* PERCENTUAL */}

            <Text style={styles.label}>
              Desconto (%)
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: 15"
              value={percentual}
              onChangeText={setPercentual}
              keyboardType="decimal-pad"
            />

            <Text style={styles.info}>
              Informe um desconto entre 0% e 100%.
            </Text>

            {/* BOTÃO CALCULAR */}

            <TouchableOpacity
              style={styles.botaoCalcular}
              onPress={aplicarDesconto}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoTexto}>
                Aplicar desconto
              </Text>
            </TouchableOpacity>

            {/* MENSAGEM DE ERRO */}

            {erro !== '' && (
              <View style={styles.erroBox}>
                <Text style={styles.erroTexto}>
                  ⚠️ {erro}
                </Text>
              </View>
            )}

            {/* RESULTADO */}

            {precoFinal !== null && economia !== null && (
              <View style={styles.resultadoBox}>

                <Text style={styles.resultadoTitulo}>
                  Resultado do desconto
                </Text>

                <Text style={styles.produtoResultado}>
                  {nomeProduto}
                </Text>

                <View style={styles.linhaResultado}>
                  <Text style={styles.textoResultado}>
                    Preço original:
                  </Text>

                  <Text style={styles.valorOriginal}>
                    {formatarMoeda(
                      Number(precoOriginal.replace(',', '.'))
                    )}
                  </Text>
                </View>

                <View style={styles.linhaResultado}>
                  <Text style={styles.textoResultado}>
                    Desconto aplicado:
                  </Text>

                  <Text style={styles.valorDesconto}>
                    {percentual.replace(',', '.')}%
                  </Text>
                </View>

                <View style={styles.linhaResultado}>
                  <Text style={styles.textoResultado}>
                    Economia:
                  </Text>

                  <Text style={styles.valorEconomia}>
                    {formatarMoeda(economia)}
                  </Text>
                </View>

                <View style={styles.divisor} />

                <Text style={styles.precoFinalLabel}>
                  PREÇO FINAL
                </Text>

                <Text style={styles.precoFinalValor}>
                  {formatarMoeda(precoFinal)}
                </Text>

                <Text style={styles.mensagemSucesso}>
                  Você economizou {formatarMoeda(economia)}!
                </Text>

              </View>
            )}

            {/* FÓRMULA */}

            <View style={styles.formulaBox}>
              <Text style={styles.formulaTitulo}>
                Fórmula utilizada
              </Text>

              <Text style={styles.formulaTexto}>
                Economia = Preço × (Desconto ÷ 100)
              </Text>

              <Text style={styles.formulaTexto}>
                Preço final = Preço original − Economia
              </Text>
            </View>

            {/* LIMPAR */}

            <TouchableOpacity
              style={styles.botaoLimpar}
              onPress={limparCampos}
            >
              <Text style={styles.limparTexto}>
                Limpar campos
              </Text>
            </TouchableOpacity>

            {/* RODAPÉ */}

            <Text style={styles.rodape}>
              Aplicativo acadêmico de cálculo de descontos.
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 18,
  },

  container: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 20,
    marginBottom: 20,
  },

  icone: {
    fontSize: 45,
    marginBottom: 8,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },

  info: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 7,
  },

  botaoCalcular: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 22,
  },

  botaoTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  erroBox: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  erroTexto: {
    color: '#b91c1c',
    fontWeight: 'bold',
    fontSize: 13,
  },

  resultadoBox: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#93c5fd',
    borderRadius: 10,
    padding: 18,
    marginTop: 22,
  },

  resultadoTitulo: {
    color: '#1e40af',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  produtoResultado: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  linhaResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  textoResultado: {
    color: '#475569',
    fontSize: 13,
  },

  valorOriginal: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: 'bold',
  },

  valorDesconto: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: 'bold',
  },

  valorEconomia: {
    color: '#15803d',
    fontSize: 14,
    fontWeight: 'bold',
  },

  divisor: {
    height: 1,
    backgroundColor: '#bfdbfe',
    marginVertical: 12,
  },

  precoFinalLabel: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  precoFinalValor: {
    color: '#15803d',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  mensagemSucesso: {
    color: '#15803d',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },

  formulaBox: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginTop: 22,
  },

  formulaTitulo: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  formulaTexto: {
    color: '#475569',
    fontSize: 12,
    marginBottom: 7,
  },

  botaoLimpar: {
    backgroundColor: '#e2e8f0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },

  limparTexto: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: 'bold',
  },

  rodape: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 11,
    marginTop: 20,
  },
});
    