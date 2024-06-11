# FUSEOM

## Background

A **filesystem** is the encoding with which all your persistent data and its
structure is written to disk. There's many ways to encode this data and store it
on a disk drive. Some popular ones are NTFS, FAT, and APFS.

Your operating system can read and write any _filesystem_ with the appropriate
**kernel driver**, which is the program that does the encoding and decoding.
If the operating system sees a FAT drive, it will loads the FAT driver and maybe
say "open this directory". The FAT drive will look at the 1's and 0's and know
how solve the OS's request from there.

**FUSE** stands for Filesystem in Userspace (don't ask me why). It's a software
interface that lets a virtual filesystem run from user-space. This means you can
implement a filesystem as a program that does everything a program can do
rather than as a kernel driver.

Filesystems
