import { router } from 'expo-router';
import React from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DOWN_PAYMENT = [5, 10, 15, 20, 25, 30, 35];
const MONTH_OPTIONS = [24, 36, 48, 60, 72, 84];

export default function Input() {
    // สร้าง State สําหรับเก็บค่าที่ป้อน
    const [carPrice, setCarPrice] = React.useState("");
    const [downPayment, setDownPayment] = React.useState(5);
    const [month, setMonth] = React.useState(24);
    const [interestRate, setInterestRate] = React.useState("");

    let monthlyPayment = 0; //ตัวแปรเก็บค่างวดรถที่คํานวณได้

    // ฟังก์ชันสำหรับคำนวณค่างวดรถ และ เปิดไปหน้า result
    const handleCalculate = () => {
        // validate UI
        if (!carPrice || !interestRate) {
            Alert.alert("คำเตือน", "กรุณากรอกข้อมูลให้ครบ");
            return;
        }

        // คํานวณค่างวดรถ
        // แปลงราคาค่ารถ กับ ดอกเบี้ย
        const carPriceValue = parseFloat(carPrice);
        const interestRateValue = parseFloat(interestRate);
        // คำนวณค่าเงินดาวน์
        const dowPaymentValue = (carPriceValue * downPayment) / 100;
        // คำนวณยอดจัด
        const carPriceLoanValue = carPriceValue - dowPaymentValue;
        // คำนวณดอกเบี้ยทั้งหมด
        const totalInterest = ((carPriceLoanValue * interestRateValue) / 100) * (month / 12);
        // คำนวณค่างวดรถต่อเดือน
        monthlyPayment = (carPriceLoanValue + totalInterest) / month;
        // เปิดไปหน้า result แบบย่้อนกลับได้
        router.push({
            pathname: "/result",
            params: {
                carPriceValue,
                dowPaymentValue,
                month,
                monthlyPayment,
                carPriceLoanValue,
            },
        });
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image source={{
                        uri: 'https://images.pexels.com/photos/5054166/pexels-photo-5054166.jpeg'
                    }}
                        style={styles.imglogo}
                    />
                </View>

                {/* ช่องกรอกราคารถ */}
                <View style={styles.container2}>
                    <Text style={styles.txtAppname}>คำนวณค่างวดรถ</Text>
                    <Text style={styles.txtPrice}>ราคารถ(บาท)</Text>
                    {/* ช่องกรอกราคารถ */}
                    <TextInput
                        placeholder="เช่น 850000"
                        keyboardType='numeric'
                        value={carPrice}
                        onChangeText={setCarPrice}
                        style={styles.inputValue} />

                    {/* ปุ่มเลือกเงินดาวน์ */}
                    <Text style={[styles.txtPrice, { marginTop: 10 }]}>เลือกเงินดาวน์(%)</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {DOWN_PAYMENT.map((item) => (
                            <TouchableOpacity
                                onPress={() => setDownPayment(item)}
                                key={item} style={[styles.monthOption, downPayment === item && styles.monthOptionActive]}>
                                <Text style={styles.monthOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* ปุ่มเลือกระยะเวลาผ่อน */}
                    <Text style={[styles.txtPrice, { marginTop: 10 }]}>เงินดาวน์(%)</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {MONTH_OPTIONS.map((item) => (
                            < TouchableOpacity
                                onPress={() => setMonth(item)}
                                key={item} style={[styles.monthOption, month === item && styles.monthOptionActive]}>
                                <Text style={styles.monthOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* ป้อนดอกเบี้ยต่อปี */}

                    <Text style={[styles.txtPrice, { marginTop: 10 }]}>ดอกเบี้ย(%ต่อปี)</Text>
                    {/* ช่องกรอกราคารถ */}
                    <TextInput
                        placeholder="เช่น 2.59"
                        keyboardType='numeric'
                        style={styles.inputValue}
                        value={interestRate}
                        onChangeText={setInterestRate}

                    />

                    {/* ปุ่มคํานวณ */}
                    <TouchableOpacity
                        style={styles.btnCal}
                        onPress={handleCalculate}>
                        <Text style={styles.btnCalText}>คํานวณค่างวดรถ</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    monthOptionActive: {
        backgroundColor: '#9b8afc',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        height: 200,
    },
    imglogo: {
        width: '100%',
        height: '100%',
    },
    txtAppname: {
        fontFamily: 'Kanit_700Bold',
        fontSize: 30,
        paddingVertical: 20,
        color: 'black',

    },
    txtPrice: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 15,
        color: 'black',
    },
    inputValue: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    },
    monthOption: {
        backgroundColor: '#ccc',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 8,
        margin: 5,
    },
    monthOptionText: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 15,
        color: 'black',
    },
    btnCal: {
        backgroundColor: '#774dc5',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    btnCalText: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 15,
        color: 'white',
    },
})