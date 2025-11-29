---
title: 在 Chrome OS 的用户终端 (crosh) 中使用 sudo 权限
date: 2024-06-19 03:11
updated: 2024-06-20 13:22:24
category: from memos
tags:
  - Chrome OS
---

首先按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F2</kbd> 打开 VT-2 终端，输入 `chronos` 用户进行登录，默认无密码
```bash
# 分别创建 ed25519 和 rsa 类型的密钥，两个都要用到
# 会询问一些信息，可以全部回车
ssh-keygen -t ed25519
ssh-keygen -t rsa

# 将密钥复制到 sshd 服务器需要的目录
sudo mkdir -p /mnt/stateful_partition/etc/ssh/
sudo cp ~/.ssh/id_ed25519 /mnt/stateful_partition/etc/ssh/ssh_host_ed25519_key
sudo cp ~/.ssh/id_rsa /mnt/stateful_partition/etc/ssh/ssh_host_rsa_key

# 允许上方的公钥建立 ssh 连接
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

接下来，往 `~/.bashrc` 中预设几个命令，好让使用的过程更方便：
```bash
echo "alias vt2port=\"sudo /usr/sbin/sshd -p 6969\"" >> ~/.bashrc
echo "alias vt2connect=\"ssh 127.1 -p 6969\"" >> ~/.bashrc

# 使命令生效
source ~/.bashrc
```

到这里具体的配置就完成了，在 VT-2 中输入 `vt2port` 后，会自动开启 sshd 服务器，之后你就可以按 <kbd>Ctrl</kbd> + <kbd>D</kbd> 注销 VT-2 了，除非你重启 Chrome OS 或手动杀掉它，否则它都会一直运行

然后按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F1</kbd> 回到 Chrome OS 中，再按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> 打开 crosh 后，输入 `shell` 进入终端再输入 `vt2connect`，会询问你要不要信任主机，确认后就可以方便的在 crosh 中使用 sudo 命令了

以后每次重新启动之后，开启 sshd 服务器需要的步骤就是：
1. 进入 VT-2 登录 `chronos` 用户
2. 输入 `vt2port` 开启 sshd 服务器
3. 注销 VT-2 返回 Chrome OS

需要在 crosh 中使用 sudo 权限的步骤：
1. 打开 crosh > 输入 `shell` 进入终端
2. 输入 `vt2connect` 连接到 sshd 服务器
3. 运行任何需要 sudo 的命令

参考链接：[oddbyte/howto-use-sudo-in-crosh](https://github.com/oddbyte/howto-use-sudo-in-crosh)
