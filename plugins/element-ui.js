import Vue from 'vue'
// 按需引入 Element UI 组件，避免整包打入首屏
import Pagination from 'element-ui/lib/pagination'
import Dialog from 'element-ui/lib/dialog'
import Autocomplete from 'element-ui/lib/autocomplete'
import Menu from 'element-ui/lib/menu'
import Submenu from 'element-ui/lib/submenu'
import MenuItem from 'element-ui/lib/menu-item'
import Input from 'element-ui/lib/input'
import Radio from 'element-ui/lib/radio'
import RadioGroup from 'element-ui/lib/radio-group'
import Checkbox from 'element-ui/lib/checkbox'
import CheckboxButton from 'element-ui/lib/checkbox-button'
import CheckboxGroup from 'element-ui/lib/checkbox-group'
import Select from 'element-ui/lib/select'
import Option from 'element-ui/lib/option'
import Button from 'element-ui/lib/button'
import Table from 'element-ui/lib/table'
import TableColumn from 'element-ui/lib/table-column'
import DatePicker from 'element-ui/lib/date-picker'
import Tabs from 'element-ui/lib/tabs'
import TabPane from 'element-ui/lib/tab-pane'
import Tag from 'element-ui/lib/tag'
import Row from 'element-ui/lib/row'
import Col from 'element-ui/lib/col'
import Form from 'element-ui/lib/form'
import FormItem from 'element-ui/lib/form-item'
import Card from 'element-ui/lib/card'
import Container from 'element-ui/lib/container'
import Main from 'element-ui/lib/main'
import Divider from 'element-ui/lib/divider'
import Cascader from 'element-ui/lib/cascader'
import Loading from 'element-ui/lib/loading'
import Message from 'element-ui/lib/message'
import MessageBox from 'element-ui/lib/message-box'
import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'
import '../theme/index.css'

locale.use(lang)

const components = [
  Pagination,
  Dialog,
  Autocomplete,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  Tabs,
  TabPane,
  Tag,
  Row,
  Col,
  Form,
  FormItem,
  Card,
  Container,
  Main,
  Divider,
  Cascader,
]

components.forEach((component) => Vue.use(component))

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
