import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

export default function App() {
    const [ displayValue, setDisplayValue ] = useState('0');
    const [ clearDisplay, setClearDisplay ] = useState(false);
    const [ operation, setOperation ] = useState(null);
    const [ values, setValues ] = useState([0, 0]);
    const [ current, setCurrent ] = useState(0);

    function addDigit(digit) {
        const _clearDisplay = displayValue === '0' || clearDisplay;

        if (digit === '.' && !_clearDisplay && displayValue.includes('.')) {
            return;
        }

        const _currentValue = _clearDisplay ? '' : displayValue;
        const _displayValue = _currentValue + digit;
        setDisplayValue(_displayValue);
        setClearDisplay(false);

        if (digit !== '.') {
            const newValue = parseFloat(_displayValue);
            const _values = [...values];
            _values[current] = newValue;
            setValues(_values);
        }
    }

    function handleClearDisplay() {
        setDisplayValue('0');
        setClearDisplay(false);
        setOperation(null);
        setValues([0, 0]);
        setCurrent(0);
    }

    function handleSetOperation(op) {
        if (current === 0) {
            setOperation(op);
            setCurrent(1);
            setClearDisplay(true);
        } else {
            const equals = op === '=';
            const _values = [...values];
            try {
                _values[0] = eval(`${_values[0]} ${operation} ${_values[1]}`);
            } catch (error) {
                _values[0] = values[0];
            }

            _values[1] = 0;
            setDisplayValue(`${_values[0]}`);
            setOperation(equals ? null : op);
            setCurrent(equals ? 0 : 1);
            setClearDisplay(true);
            setValues(_values);
        }
    }

    return (
        <View style={styles.container}>
            <Display value={displayValue} />
            <View style={styles.buttons}>
                <Button label="AC" triple onPress={handleClearDisplay} />
                <Button label="/" operation onPress={handleSetOperation} />
                <Button label="7" onPress={addDigit} />
                <Button label="8" onPress={addDigit} />
                <Button label="9" onPress={addDigit} />
                <Button label="*" operation onPress={handleSetOperation} />
                <Button label="4" onPress={addDigit} />
                <Button label="5" onPress={addDigit} />
                <Button label="6" onPress={addDigit} />
                <Button label="-" operation onPress={handleSetOperation} />
                <Button label="1" onPress={addDigit} />
                <Button label="2" onPress={addDigit} />
                <Button label="3" onPress={addDigit} />
                <Button label="+" operation onPress={handleSetOperation} />
                <Button label="0" double onPress={addDigit} />
                <Button label="." onPress={addDigit} />
                <Button label="=" operation onPress={handleSetOperation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
