import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
}


export function Dashboard() {
    const data: DataListProps [] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: "24/02/2022"
        },
        {
            id: '2',
            type: 'negative',
            title: "Hamburguewr Pizzy",
            amount: "R$59,00",
            category: {
                name: 'Alimentação',
                icon: 'coffee'
            },
            date: "24/02/2022"
        },
        {
            id: '3',
            type: 'negative',
            title: "Aluguel do apartamento",
            amount: "R$1.200,00",
            category: {
                name: 'Casa',
                icon: 'home'
            },
            date: "24/02/2022"
        }
    ];

    return (
        <Container>
            <Header>

                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://github.com/mviniciusgo94.png' }} />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Marcus Vinícius</UserName>
                        </User>
                    </UserInfo>

                    <Icon name="power" />

                </UserWrapper>
            </Header>

            <HighlightCards

            >
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 22 de Fevereiro" />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última saída dia 22 de Fevereiro" />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 17.400,00"
                    lastTransaction="Valor atual" />
            </HighlightCards>

            <Transactions>
                <Title>
                    Listagem
                </Title>

                <TransactionList
                    data={data}
                    keyExtractor ={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item}/>}
                />

            </Transactions>

        </Container>
    )

}