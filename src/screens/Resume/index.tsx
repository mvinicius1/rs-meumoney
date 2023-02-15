import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { HistoryCard } from '../../components/HistoryCard';
import {
    Container,
    Header,
    Title,
    Content,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    MonthText,
} from './styles';
import { categories } from '../../utils/categories';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

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
    const [selectedDate, setSelectedDate] = useState(new Date())
    const totalToSum: number[] = ([]);

   const handleDateChange = (action: 'next' | 'prev') => {
    if(action === 'next'){
        setSelectedDate(addMonths(selectedDate , 1));
    }else{
        setSelectedDate(subMonths(selectedDate , 1));
    }
   }

    async function loadData() {
        const dataKey = '@meumoney:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((expensive: TransactionData) => 
            expensive.type === 'negative' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
            )

        const totalByCategory: TotalByCategoryProps[] = [];

        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })
            if (categorySum > 0) {
                totalByCategory.push({
                    key: category.key,
                    color: category.color,
                    name: category.name,
                    total: categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                })
                totalToSum.push(categorySum)
            }
        })
        totalByCategory.push({
            key: "total",
            color: "black",
            name: "Total gasto",
            total: totalToSum.reduce(
                (a, b) => a + b,
                0
            ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }),
        })
        setTotalByCategories(totalByCategory)
    }

/*     useEffect(() => {
        loadData();
    }, [selectedDate]) */

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        <Container>
            <Header>
                <Title>Resumo dos gastos</Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: useBottomTabBarHeight()
                }}>
                <MonthSelect>
                    <MonthSelectButton onPress={() => {
                        handleDateChange('prev')
                    }}>
                        <MonthSelectIcon name="chevron-left"/>
                    </MonthSelectButton>
                        <MonthText>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</MonthText>
                    <MonthSelectButton onPress={() => {
                        handleDateChange('next')
                    }}>
                        <MonthSelectIcon name="chevron-right"/>
                    </MonthSelectButton>
                </MonthSelect>
                {totalByCategories
                    .map(item =>
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

