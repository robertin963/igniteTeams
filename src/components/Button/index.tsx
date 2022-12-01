import { TouchableOpacityProps } from 'react-native';
import { Container, ButtonTypeStyleProps, Text } from "./style";

type Props = TouchableOpacityProps & {
  text: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ text, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container type={type} {...rest} >
      <Text>{text}</Text>
    </Container>
  )
}