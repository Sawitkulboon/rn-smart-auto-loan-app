import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Result() {
    // เอาค่าที่ส่งมาในตัวแปรเพื่อเอาไปใช้ในการแสดงผล
    const params = useLocalSearchParams();
    const { carPriceValue,
        dowPaymentValue,
        carPriceLoanValue,
        month,
        monthlyPayment, }
        = params;

    // สร้างฟังก์ชันจัดรูปแบบตัวเลขที่มีค่าทศนิยม 2 ตําแหน่ง , คั่นด้วย ,
    const formatNumber = (number: string | number) => {
        return Number(number).toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // ทำปุ่มย้อนกลับไปหน้า input
    return (
        <View style={styles.container}>
            <Image source={require("@/assets/images/car-key.png")} style={{ width: 100, height: 100, marginBottom: 10, alignSelf: "center", marginTop: 20 }} />
            <Text style={styles.txtAppname}>สรุปยอดผ่อนชำระ</Text>
            {/* ทำกล่องใส่ข้อความ */}
            <View style={styles.box}>
                <Text style={styles.txtAppname1}>ผ่อนเริ่มต้นเพียง</Text>
                <Text style={[styles.txtAppname1, { fontSize: 40 }]}>{formatNumber(Number(monthlyPayment))} บาท</Text>
                <Text style={styles.txtAppname1}>บาท / เดือน ({month} เดือน</Text>
            </View>
            <View style={styles.box1}>
                <View style={styles.row}>
                    <Text style={styles.txtAppname2}>ราคารถยนต์</Text>
                    <Text style={styles.txtAppname3}>{formatNumber(Number(carPriceValue))} บาท</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.txtAppname2}>เงินดาวน์</Text>
                    <Text style={styles.txtAppname3}>{formatNumber(Number(dowPaymentValue))} บาท</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.txtAppname2}>ยอดจัด</Text>
                    <Text style={styles.txtAppname3}>{formatNumber(Number(carPriceLoanValue))} บาท</Text>
                </View>

            </View>
            <TouchableOpacity style={styles.btn1} onPress={() => router.back()}>
                <Text style={styles.btn}>คำนวณใหม่</Text>
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    btn1: {
        marginTop: 20,
        backgroundColor: '#003c4e',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 130,
        borderColor: 'white',
        color: 'white',
    },
    btn: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    txtAppname2: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 16,
        color: 'grey',
    },
    txtAppname3: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 18,
        color: 'grey',
    },

    txtAppname1: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'Kanit_400Regular',
        fontSize: 15,
        color: 'white',
    },
    txtAppname: {
        fontFamily: 'Kanit_700Bold',
        fontSize: 25,
        alignSelf: 'center',
        paddingVertical: 20,
        color: 'white',
    },
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: '#003c4e',
    },
    box1: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
    },
    box: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        backgroundColor: '#0093fc',
        marginBottom: 20
    }
})