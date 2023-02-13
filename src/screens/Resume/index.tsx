import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import {
    Container,
    Header,
    Title,
    Content
} from './styles';
import { categories } from '../../utils/categories';

interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface TotalByCategoryProps {
    key: string;
    name: string;
    total: string;
    color: string;
}

export const Resume = () => {
    const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryProps[]>([]);

    async function loadData(){
        const dataKey = '@meumoney:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
        .filter((expensive: TransactionData) => expensive.type === 'negative')
        
        const totalByCategory : TotalByCategoryProps[] = [];

        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive : TransactionData) => {
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount)
                }
            })
            if(categorySum > 0){
                totalByCategory.push({
                    key: category.key,
                    color:category.color,
                    name: category.name,
                    total: categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                })
            }
        }) 
        setTotalByCategories(totalByCategory)
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Container>
            <Header>
                <Title>Resumo dos gastos</Title>
            </Header>
        <Content>
        {totalByCategories.map( item =>
            <HistoryCard 
            key={item.key}
            color={item.color} 
            title={item.name} 
            amount={item.total}
            />
        )}
        </Content>
       

        </Container>
    )
}

