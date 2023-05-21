const DEFAULT_SETTINGS = {
  status: false,
  rules: [
    {
      events: ['copy'],
      patterns: [
        '.*://www.bilibili.com/read/.*',
        '.*://blog.csdn.net/.*',
        '.*://www.jianshu.com/p/.*',
        '.*://www.zhihu.com/question/.*',
      ],
    },
  ],
};
