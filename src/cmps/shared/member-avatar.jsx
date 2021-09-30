import Avatar from 'react-avatar';



export function MemberAvatar({ member, size, style = {} }) {

    function getSize() {
        switch (size) {
            case 'sm':
                return 20
            case 'lg':
                return 50
            case 'md':
            default:
                return 32
        }
    }
    // src={member.imgUrl}
    return <Avatar name={member.fullname} src={member.imgUrl} size={getSize()} style={style} round />
}