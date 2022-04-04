import OSS from 'ali-oss';
import path from 'path';
import { OSS_PREFIX } from '../consts';

export const FORM_NAME = 'FORM_NAME';
export const FORM_PATH = 'FORM_PATH';

const prefix = OSS_PREFIX;

const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tFyuNqEzBTQ9g5cAAQM',
  accessKeySecret: 'XF9f4vkh6boMECfjcv7uVkM9bWCJSQ',
  bucket: 'harwordliu-storyboard',
});

async function list() {
  const data = await client.list(
    {
      'max-keys': 1000,
      prefix,
    },
    {}
  );
  return data.objects.slice(1);
}

async function get(item: any) {
  const name = /\//.test(item.name) ? item.name : `${prefix}/${item.name}`;
  const result = await client.get(name);
  return { name, text: result.content.toString('utf-8') };
}

async function create(data: any) {
  const { FORM_NAME, FORM_PATH = '/' } = data;
  const dir = path.normalize(FORM_PATH);
  const target = `${prefix}${dir}${FORM_NAME}`;
  client.put(target, Buffer.from(`# ${FORM_NAME}`));
}

async function put(data: any) {
  const { name, text = '' } = data;
  $tools.log.info(`PUT: ${name} success!`);
  client.put(name, Buffer.from(text));
}

export { list, get, create, put };
