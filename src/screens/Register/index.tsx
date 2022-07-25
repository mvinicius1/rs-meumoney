import React, { useState } from "react";
import { Modal ,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import uuid from 'react-native-uuid'
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useForm } from "react-hook-form";
import {useNavigation } from '@react-navigation/native';
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from "./styles";

interface FormData {
    name: string;
    amount: string;
}

type NavigationProps = {
    navigate:(screen:string) => void;
 }

const schema = Yup.object().shape({
    name: Yup.string()
    .required("Nome é obrigatório"),
    amount: Yup.number()
    .typeError("Informe um número")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório")
})

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const navigation = useNavigation<NavigationProps>()

    const {
        control,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm(
        {resolver: yupResolver(schema)}
    );

    async function handleRegister(form: FormData) {
        if(!transactionType) return Alert.alert("Selecione o tipo da transação");
        if(category.key === 'category')  return Alert.alert("Selecione a categoria");
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }
        try {
            const dataKey = '@meumoney:transactions';
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const formatedData = [
                ...currentData,
                newTransaction
            ]
          
        await AsyncStorage.setItem(dataKey, JSON.stringify(formatedData));
        reset();
        setTransactionType('');
        setCategory({
            key: 'category',
            name: 'Categoria'
        })
        } catch (error) {
            Alert.alert("Não foi possível salvar");
        }
        navigation.navigate('Listagem');
    }

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>


                <Header>
                    <Title>
                        Cadastro
                    </Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            errorText={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Valor"
                            keyboardType="numeric"
                            errorText={errors.amount && errors.amount.message}
                        />

                        <TransactionsType>
                            <TransactionTypeButton
                                type="up"
                                title="Entrada"
                                onPress={() => { handleTransactionsTypeSelect('positive') }}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Saída"
                                onPress={() => { handleTransactionsTypeSelect('negative') }}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionsType>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button
                        title="Adicionar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>

            </Container>

        </TouchableWithoutFeedback>

    )
}