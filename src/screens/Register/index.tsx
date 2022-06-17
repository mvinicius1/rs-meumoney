import React, {useState} from "react";
import  {Modal} from 'react-native';

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton} from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from "./styles";

export function Register() {
    
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });


    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }


    return (
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Valor" />

                    <TransactionsType>
                        <TransactionTypeButton
                            type="up"
                            title="Entrada"
                            onPress={() =>{handleTransactionsTypeSelect('up')}}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Saída"
                            onPress={() =>{handleTransactionsTypeSelect('down')}}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsType>
                    <CategorySelectButton 
                    title={category.name}
                    onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button title="Adicionar" />
            </Form>

        <Modal visible={categoryModalOpen}>
            <CategorySelect
            category= {category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
            />
        </Modal>

        </Container>
    )
}