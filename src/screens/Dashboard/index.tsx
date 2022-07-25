import React, { useCallback, useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from "react-native";

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
    TransactionList,
    LogoutButton
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}


export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [lastIncome, setLastIncome] = useState<DataListProps>({} as DataListProps);
    const [lastOutcome, setLastOutcome] = useState<DataListProps>({} as DataListProps);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const [isLoading, setLoading] = useState(true);

    async function loadTransactions() {
        const dataKey = '@meumoney:transactions';
        const res = await AsyncStorage.getItem(dataKey);
        const transactions = res ? JSON.parse(res) : [];

        let totalEntries = 0;
        let totalExpensives = 0;

        const formattedTransactions: DataListProps[] = transactions
            .map((item: DataListProps) => {
                if (item.type === 'positive') {
                    totalEntries += Number(item.amount)
                } else {
                    totalExpensives += Number(item.amount)
                }
                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date: item.date,
                }
            });
        setTransactions(formattedTransactions);

        setLastIncome(transactions
            .filter((transaction: DataListProps) => transaction.type === 'positive')
            .slice(-1)[0])

        setLastOutcome(transactions
            .filter((transaction: DataListProps) => transaction.type === 'negative')
            .slice(-1)[0])

        const total = totalEntries - totalExpensives;
        setHighlightData({
            entries: {
                amount: totalEntries.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: totalExpensives.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
        })
        setLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <>
            {
                isLoading ?
                    <ActivityIndicator />
                    :
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
                                <LogoutButton onPress={() => { }}>
                                    <Icon name="power" />
                                </LogoutButton>

                            </UserWrapper>
                        </Header>

                        <HighlightCards>


                            {lastIncome && <HighlightCard
                                type="up"
                                title="Entradas"
                                amount={
                                    Number(lastIncome?.amount)
                                        .toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })
                                }
                                lastTransaction={
                                    `Última entrada dia ${Intl.DateTimeFormat('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                    }).format(new Date(lastIncome.date))}`} />}

                            {lastOutcome && <HighlightCard
                                type="down"
                                title="Saídas"
                                amount={
                                    Number(lastOutcome?.amount)
                                        .toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })
                                }
                                lastTransaction={
                                    `Última saída dia ${Intl.DateTimeFormat('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                    }).format(new Date(lastOutcome.date))}`} />}

                            {lastIncome && lastOutcome && <HighlightCard
                                type="total"
                                title="Total"
                                amount={highlightData.total.amount}
                                lastTransaction={
                                    `De 01 a ${Intl.DateTimeFormat('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                    }).format(new Date(lastOutcome.date))}`} />}
                        </HighlightCards>

                        <Transactions>
                            <Title>
                                Listagem
                            </Title>

                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />

                        </Transactions>

                    </Container>
            }
        </>
    )

}